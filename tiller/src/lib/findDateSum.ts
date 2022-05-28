import { findLastValue } from './findLastValue';

export function findDateSum(date: Date, rows: DataRow[]): number {
  return Array.from(
    { length: rows.length ? rows[0].length : 0 },
    (_, i: number) => findLastValue(date, rows, i + 1)
  ).reduce((a: number, b: number) => a + b, 0);
}
