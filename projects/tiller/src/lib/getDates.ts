import { MILLISECONDS_IN_A_DAY } from '../constants';

export function getDates(
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): Date[] {
  const times = [...assets, ...liabilities].map((r) => r[0].getTime());

  if (times.length === 0) {
    return [];
  }

  const startTime = Math.min(...times);
  const endTime = Math.max(...times) + 1;

  return Array.from(
    new Array(Math.ceil((endTime - startTime) / MILLISECONDS_IN_A_DAY)),
    (_, i) => new Date(startTime + i * MILLISECONDS_IN_A_DAY)
  );
}
