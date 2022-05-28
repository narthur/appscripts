import { HEADER } from './constants';
import { findLastValue } from './lib/findLastValue';
import { findDelta } from './lib/findDelta';

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
