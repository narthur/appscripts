import { findDelta } from './findDelta';

export function findNetDelta(
  date: Date,
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): number {
  return findDelta(date, assets) - findDelta(date, liabilities);
}
