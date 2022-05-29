import { parseDate } from './parseDate';

describe('parseDate', () => {
  it('rejects empty string', () => {
    expect(() => parseDate('')).toThrowError('Unable to parse date');
  });
});
