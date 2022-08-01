import { cron } from './cron';
import { getGoals, getUser } from './lib/beeminder';

vi.mock('./lib/beeminder');
vi.mock('./lib/sheets');

const mockGetUser = getUser as vi.Mock;
const mockGetGoals = getGoals as vi.Mock;

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
