import { HEADER } from './Constants';

export function LAST(data: unknown): unknown {
  if (!Array.isArray(data)) return data;
  return data[data.length - 1];
}

function findLastIndex(
  date: Date,
  rows: DataRow[],
  index: number,
  predicate: (row: unknown[]) => boolean = () => true
): number {
  const reversed = [...rows];
  reversed.reverse();
  const i = reversed.findIndex((r) => {
    if (r[0] > date) return false;
    return predicate ? predicate(r) : true;
  });

  return i === -1 ? -1 : rows.length - i - 1;
}

function findLastValue(date: Date, rows: DataRow[], index: number): number {
  if (index < 1) return 0;

  const i = findLastIndex(
    date,
    rows,
    index,
    (r) => typeof r[index] === 'number'
  );

  if (i === -1) return 0;

  return rows[i][index] as number;
}

function findDelta(date: Date, data: DataRow[]): number {
  return Array.from(
    { length: data.length ? data[0].length - 1 : 0 },
    (v, i) => {
      const cellIndex = i + 1;
      const rowIndex = findLastIndex(date, data, cellIndex);

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

function findNetDelta(
  date: Date,
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): number {
  return findDelta(date, assets) - findDelta(date, liabilities);
}

function findDateSum(date: Date, rows: DataRow[]): number {
  return Array.from(
    { length: rows.length ? rows[0].length : 0 },
    (_, i: number) => findLastValue(date, rows, i + 1)
  ).reduce((a: number, b: number) => a + b, 0);
}

function isDataRow(row: unknown[]): row is DataRow {
  if (row.length < 2) return false;
  if (!(row[0] instanceof Date)) return false;

  return row.slice(1).every((v) => v === '' || !isNaN(parseInt(String(v))));
}

function isAssetRow(row: unknown[]): row is AssetRow {
  return isDataRow(row);
}

function isLiabilityRow(row: unknown[]): row is LiabilityRow {
  return isDataRow(row);
}

export function NETWORTHS(
  assets: (AssetRow | EmptyRow)[],
  liabilities: (LiabilityRow | EmptyRow)[]
): [typeof HEADER, ...NetWorthRow[]] {
  const a: AssetRow[] = assets.filter(isAssetRow);
  const l: LiabilityRow[] = liabilities.filter(isLiabilityRow);

  const assetDates = a.map((r) => r[0]);
  const liabilityDates = l.map((r) => r[0]);
  const dates = [...assetDates, ...liabilityDates].filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );
  dates.sort((a, b) => a.getTime() - b.getTime());

  const rows = dates.map((date): NetWorthRow => {
    const asset = findDateSum(date, a);
    const liability = findDateSum(date, l);
    const netWorth = asset - liability;
    const delta = findNetDelta(date, a, l);

    return [date, asset, liability ? -liability : 0, netWorth, delta];
  });

  return [HEADER, ...rows];
}
