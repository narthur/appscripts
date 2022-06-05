import { cron } from './cron';
import { getGoals, getUser } from './lib/beeminder';

jest.mock('./lib/beeminder');
jest.mock('./lib/sheets');

const mockGetUser = getUser as jest.Mock;
const mockGetGoals = getGoals as jest.Mock;

describe('cron', () => {
  beforeEach(() => {
    mockGetUser.mockResolvedValue({ goals: [], urgency_load: 1 });
    mockGetGoals.mockResolvedValue([]);
  });

  it('syncs user on cron', async () => {
    await cron();

    expect(getUser).toHaveBeenCalled();
  });

  it('syncs on cron run', async () => {
    await cron();

    expect(getGoals).toBeCalled();
  });
});
