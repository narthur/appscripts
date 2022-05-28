import { findLastValue } from './findLastValue';

describe('findLastValue', () => {
  it('correctly finds last value', () => {
    const result = findLastValue(
      new Date('4/3/22'),
      [
        [new Date('4/1/22'), 2],
        [new Date('4/2/22'), 1],
        [new Date('4/4/22'), 1]
      ],
      1
    );

    expect(result).toEqual(1);
  });
});
