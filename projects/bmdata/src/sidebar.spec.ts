import { sidebar } from './sidebar';
import { showSidebar } from './lib/sheets';
import { getDocumentProperties } from './lib/properties';

jest.mock('./lib/sheets');
jest.mock('./lib/properties');
jest.mock('./lib/app');
jest.mock('./lib/beeminder');
jest.mock('./syncUser');

const mockGetDocumentProperties = getDocumentProperties as jest.Mock;

describe('sidebar', () => {
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
});
