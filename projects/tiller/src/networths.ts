import { HEADER } from './constants';
import { makeNetWorthRow } from './lib/makeNetworthRow';
import { getDates } from './lib/getDates';

function isDataRow(row: unknown[]): row is DataRow {
  if (row.length < 2) return false;
  if (!(row[0] instanceof Date)) return false;

  return row.slice(1).every((v) => v === '' || typeof v === 'number');
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
  const dates = getDates(a, l);
  const rows = dates.map((d) => makeNetWorthRow(d, a, l));

  return [HEADER, ...rows];
}
