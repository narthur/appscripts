import { getGoals } from './beeminder';
import { getDocumentProperties } from './properties';
import fetchJson from './fetchJson';

vi.mock('./properties');
vi.mock('./fetchJson');

const mockGetDocumentProperties = getDocumentProperties as vi.Mock;
const mockFetchJson = fetchJson as vi.Mock;

describe('beeminder', () => {
  it('uses saved user and token', async () => {
    mockGetDocumentProperties.mockReturnValue({
      user: 'the_user',
      token: 'the_token'
    });
    mockFetchJson.mockResolvedValue([]);

    await getGoals();

    expect(fetchJson).toBeCalledWith(
      expect.stringMatching(/the_user.+the_token/)
    );
  });
});
