import { GOAL } from './goal';
import { getGoal } from './lib/beeminder';

vi.mock('./lib/beeminder');

const mockNow = new Date('2020-01-01T00:00:00.000Z');

vi.useFakeTimers().setSystemTime(mockNow);

const mockGetGoal = getGoal as vi.Mock;

describe('GOAL', () => {
  it('uses args', async () => {
    await GOAL('the_slug', 1);

    const expected = mockNow.getTime() / 1000 - 24 * 60 * 60;

    expect(mockGetGoal).toHaveBeenCalledWith('the_slug', expected);
  });

  it('returns datapoints', async () => {
    mockGetGoal.mockResolvedValue({
      slug: 'the_slug',
      datapoints: [
        {
          timestamp: new Date(0),
          value: 1,
          comment: 'the_comment'
        }
      ]
    });

    await expect(GOAL('the_slug', 1)).resolves.toEqual([
      ['timestamp', 'value', 'comment'],
      [new Date(0), 1, 'the_comment']
    ]);
  });
});
