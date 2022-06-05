import { TIMELINES } from './timelines';
import dayjs from 'dayjs';

describe('TIMELINES', () => {
  it('returns target headers', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [], dayjs('2020-01-01').toDate(), 0);

    expect(result[0][1]).toEqual('target');
  });

  it('returns dates', () => {
    const startDate = dayjs('2020-01-01').toDate();
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [], startDate, 0);

    expect(result[1][0]).toEqual(startDate);
  });

  it('returns three-step timeline', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [[1]], dayjs('2020-01-01').toDate(), 0);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.anything(),
        [dayjs('2020-01-1').toDate(), 0],
        [dayjs('2020-02-1').toDate(), 1],
        [dayjs('2020-03-1').toDate(), 1]
      ])
    );
  });

  it('returns four-step timeline', () => {
    const targets: [string, number][] = [['target', 2]];
    const result = TIMELINES(targets, [[1]], dayjs('2020-01-01').toDate(), 0);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.anything(),
        [dayjs('2020-01-01').toDate(), 0],
        [dayjs('2020-02-01').toDate(), 0],
        [dayjs('2020-03-01').toDate(), 1],
        [dayjs('2020-04-01').toDate(), 1]
      ])
    );
  });

  it('handles impossible target', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [[0]], dayjs('2020-01-01').toDate(), 0);

    expect(result).not.toEqual(
      expect.arrayContaining([[expect.anything(), 1]])
    );
  }, 100);

  it('returns probabilities in order', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(
      targets,
      [[1], [0]],
      dayjs('2020-01-01').toDate(),
      0
    );

    const probabilities = result.slice(1).map((r) => r[1]);
    const sortedProbabilities = [...probabilities].sort();

    expect(probabilities).toEqual(sortedProbabilities);
  });

  it('handles multiple targets', () => {
    const targets: [string, number][] = [
      ['target1', 1],
      ['target2', 2]
    ];
    const result = TIMELINES(targets, [[1]], dayjs('2020-01-01').toDate(), 0);

    expect(result).toEqual(
      expect.arrayContaining([
        ['Date', 'target1', 'target2'],
        [dayjs('2020-01-01').toDate(), 0, 0],
        [dayjs('2020-02-01').toDate(), 1, 0],
        [dayjs('2020-03-01').toDate(), 1, 1]
      ])
    );
  });

  it('returns 10 years of data', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [[1]], dayjs('2020-01-01').toDate(), 0);

    expect(result).toHaveLength(12 * 10 + 1);
  });

  it('ignores empty history entries', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(
      targets,
      [[1], [''], ['']],
      dayjs('2020-01-01').toDate(),
      0
    );

    expect(result[result.length - 1][1]).toEqual(1);
  });

  it('accepts starting balance', () => {
    const targets: [string, number][] = [['target', 1]];
    const result = TIMELINES(targets, [[0]], dayjs('2020-01-01').toDate(), 1);

    expect(result[result.length - 1][1]).toEqual(1);
  });
});
