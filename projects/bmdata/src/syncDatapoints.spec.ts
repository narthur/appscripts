import { syncDatapoints } from './syncDatapoints';
import { appendRow, getSheetData } from './lib/sheets';
import { getGoal, getGoals } from './lib/beeminder';

jest.mock('./lib/fetchJson');
jest.mock('./lib/sheets');
jest.mock('./lib/beeminder');
jest.mock('./lib/properties');

const mockGetSheetData = getSheetData as jest.Mock;
const mockGetGoals = getGoals as jest.Mock;
const mockGetGoal = getGoal as jest.Mock;

describe('syncDatapoints', () => {
  it('runs', async () => {
    mockGetSheetData.mockReturnValue([['slug']]);
    mockGetGoals.mockReturnValue([{ slug: 'slug' }]);
    mockGetGoal.mockReturnValue({ slug: 'slug', datapoints: [{ id: '1' }] });

    await syncDatapoints();

    expect(appendRow).toBeCalled();
  });
});
