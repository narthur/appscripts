import { findLastIndex } from './findLastIndex';
import { findLastValue } from './findLastValue';

export function findDelta(date: Date, data: DataRow[]): number {
  return Array.from(
    { length: data.length ? data[0].length - 1 : 0 },
    (v, i) => {
      const cellIndex = i + 1;
      const rowIndex = findLastIndex(date, data);

      if (rowIndex < 1) return 0;

      const isInit = data
        .slice(0, rowIndex)
        .every((r: unknown[]) => r[cellIndex] === '');

      if (isInit) return 0;

      const valAfter = findLastValue(data[rowIndex][0], data, cellIndex);
      const valBefore = findLastValue(data[rowIndex - 1][0], data, cellIndex);

      return valAfter - valBefore;
    }
  ).reduce((a, b) => a + b, 0);
}
