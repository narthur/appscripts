import { SIMULATE } from './index';

describe('SIMULATE', () => {
  it('simulates', () => {
    const result = SIMULATE(1, [[1]], new Date('1/1/22'), 2, 0);

    expect(result[0]).toEqual(new Date('1/1/22'));
  });
});
