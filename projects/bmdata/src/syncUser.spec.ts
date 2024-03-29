import { syncUser } from './syncUser';
import { getUser } from './lib/beeminder';
import { appendRow } from './lib/sheets';

vi.mock('./lib/beeminder');
vi.mock('./lib/sheets');
vi.mock('./syncDatapoints');

const mockGetUser = getUser as vi.Mock;

describe('syncUser', () => {
  it('runs', async () => {
    mockGetUser.mockResolvedValue({ goals: [], urgency_load: 1 });

    await syncUser();

    expect(getUser).toHaveBeenCalled();
  });

  it('appends user row', async () => {
    mockGetUser.mockResolvedValue({ goals: [], urgency_load: 1 });

    await syncUser();

    expect(appendRow).toHaveBeenCalledWith('user', [expect.any(Number), 0, 1]);
  });
});
