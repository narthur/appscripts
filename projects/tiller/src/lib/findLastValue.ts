import { findLastIndex } from './findLastIndex';

export function findLastValue(
  date: Date,
  rows: DataRow[],
  index: number
): number {
  if (index < 1) return 0;

  const i = findLastIndex(date, rows, (r) => typeof r[index] === 'number');

  if (i === -1) return 0;

  return rows[i][index] as number;
}
