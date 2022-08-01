import { showSidebar } from './lib/sheets';
import { getDocumentProperties } from './lib/properties';
import { Mock } from 'vitest';
import { sidebar } from './sidebar';
import mockGas from './lib/test/mockGas';
import { resolve } from 'path';

vi.mock('./lib/sheets');
vi.mock('./lib/properties');
vi.mock('./lib/app');
vi.mock('./lib/beeminder');
vi.mock('./syncUser');

const gas = mockGas(resolve(__dirname, '../build'));

const mockGetDocumentProperties = getDocumentProperties as Mock;

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

  it('renders sidebar', () => {
    gas.lib.sidebar();

    expect(gas.mocks.HtmlService.createTemplateFromFile).toBeCalledWith(
      'settings'
    );
  });
});
