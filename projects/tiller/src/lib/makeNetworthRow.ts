import { findDateSum } from './findDateSum';
import { findNetDelta } from './findNetDelta';

export function makeNetWorthRow(
  date: Date,
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): NetWorthRow {
  const asset = findDateSum(date, assets);
  const liability = findDateSum(date, liabilities);
  const netWorth = asset - liability;
  const delta = findNetDelta(date, assets, liabilities);

  return [date, asset, liability ? -liability : 0, netWorth, delta];
}
