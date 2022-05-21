import { LAST } from './Code';

describe('Tiller LAST', () => {
  it('returns last', () => {
    expect(LAST([1, 2, 3])).toBe(3);
  });
});
