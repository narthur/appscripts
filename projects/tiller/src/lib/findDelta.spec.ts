import { findDelta } from './findDelta';

describe('findDelta', () => {
  it('finds delta', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1],
      [new Date('2019-01-02'), 2]
    ];

    const delta = findDelta(new Date('2019-01-02'), data);

    expect(delta).toEqual(1);
  });

  it('infers delta when value is unset', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), ''],
      [new Date('2019-01-02'), 2]
    ];

    const delta = findDelta(new Date('2019-01-02'), data);

    expect(delta).toEqual(0);
  });

  it('handles unset value in between values', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1],
      [new Date('2019-01-02'), ''],
      [new Date('2019-01-03'), 2]
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(1);
  });

  it('handles unset value at end of data', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1],
      [new Date('2019-01-02'), 2],
      [new Date('2019-01-03'), '']
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(0);
  });

  it('handles missing date row', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1],
      [new Date('2019-01-02'), 2]
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(0);
  });

  it('handles empty data', () => {
    const data: DataRow[] = [];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(0);
  });

  it('distinguishes between accounts', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1, 1],
      [new Date('2019-01-02'), 2, '']
    ];

    const delta = findDelta(new Date('2019-01-02'), data);

    expect(delta).toEqual(1);
  });

  it('handles unset values throughout', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1, 1],
      [new Date('2019-01-02'), '', ''],
      [new Date('2019-01-03'), 2, 2]
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(2);
  });

  it('handles unset value at end of first column', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), 1, 1],
      [new Date('2019-01-02'), 1, ''],
      [new Date('2019-01-03'), '', 2]
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(1);
  });

  it('handles all unset data', () => {
    const data: DataRow[] = [
      [new Date('2019-01-01'), '', ''],
      [new Date('2019-01-02'), '', ''],
      [new Date('2019-01-03'), '', '']
    ];

    const delta = findDelta(new Date('2019-01-03'), data);

    expect(delta).toEqual(0);
  });
});
