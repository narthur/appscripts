import { syncDatapoints } from './syncDatapoints';
import { appendRow, getSheetData } from './lib/sheets';
import { getGoal, getGoals } from './lib/beeminder';

vi.mock('./lib/fetchJson');
vi.mock('./lib/sheets');
vi.mock('./lib/beeminder');
vi.mock('./lib/properties');

const mockGetSheetData = getSheetData as vi.Mock;
const mockGetGoals = getGoals as vi.Mock;
const mockGetGoal = getGoal as vi.Mock;

describe('syncDatapoints', () => {
  it('runs', async () => {
    mockGetSheetData.mockReturnValue([['slug']]);
    mockGetGoals.mockReturnValue([{ slug: 'slug' }]);
    mockGetGoal.mockReturnValue({ slug: 'slug', datapoints: [{ id: '1' }] });

    await syncDatapoints();

    expect(appendRow).toBeCalled();
  });
});
