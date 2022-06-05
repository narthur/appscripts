import datePlusMonths from './datePlusMonths';
import dayjs from 'dayjs';

describe('datePlusMonths', () => {
  it('returns first day of the month n months from now', () => {
    const date = dayjs('2020-01-01').toDate();
    const result = datePlusMonths(date, 1);

    expect(result.getFullYear()).toEqual(2020);
    expect(result.getMonth()).toEqual(1); // zero-based
    expect(result.getDate()).toEqual(1);
  });
});
