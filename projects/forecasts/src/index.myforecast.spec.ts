import { MYFORECAST } from './index';

describe('MYFORECAST', () => {
  it('forecasts', () => {
    const result = MYFORECAST(1, [[1]], 0);

    expect(result[0]).toEqual([0]);
  });
});
