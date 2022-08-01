import {
  getDocumentProperties,
  updateDocumentProperties
} from './lib/properties';
import { processForm } from './processForm';

vi.mock('./lib/properties');

const mockGetDocumentProperties = getDocumentProperties as vi.Mock;

describe('processForm', () => {
  it('updates document properties', () => {
    const data = { user: 'the_user', token: 'the_token' };
    processForm(data);
    expect(updateDocumentProperties).toBeCalledWith({
      auths: JSON.stringify([data])
    });
  });

  it('appends a new auth', () => {
    const previous = { user: 'old_user', token: 'old_token' };
    mockGetDocumentProperties.mockReturnValue({
      auths: JSON.stringify([previous])
    });

    const data = { user: 'the_user', token: 'the_token' };
    processForm(data);
    expect(updateDocumentProperties).toBeCalledWith({
      auths: JSON.stringify([previous, data])
    });
  });
});
