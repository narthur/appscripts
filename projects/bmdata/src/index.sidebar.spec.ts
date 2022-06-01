import { cron, onOpen, sidebar } from './index';
import { addMenuItem, showSidebar } from './lib/sheets';
import { getDocumentProperties } from './lib/properties';
import { createTimeDrivenTrigger } from './lib/app';
import { getGoals } from './lib/beeminder';

jest.mock('./lib/sheets');
jest.mock('./lib/properties');
jest.mock('./lib/app');
jest.mock('./lib/beeminder');

const mockGetDocumentProperties = getDocumentProperties as jest.Mock;
const mockGetGoals = getGoals as jest.Mock;

describe('sidebar', () => {
  it('adds a menu item to open the sidebar', () => {
    onOpen();

    expect(addMenuItem).toBeCalledWith('Settings', 'sidebar');
  });

  it('shows sidebar', () => {
    mockGetDocumentProperties.mockReturnValue({
      user: 'the_user',
      token: 'the_token'
    });

    sidebar();

    expect(showSidebar).toBeCalledWith('Settings', 'settings', {
      user: 'the_user',
      token: 'the_token'
    });
  });

  it('registers trigger', () => {
    onOpen();

    expect(createTimeDrivenTrigger).toBeCalledWith('cron', 1);
  });

  it('syncs on cron run', async () => {
    mockGetGoals.mockResolvedValue([]);

    await cron();

    expect(getGoals).toBeCalled();
  });
});
