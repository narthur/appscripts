export function getDates(
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): Date[] {
  const assetDates = assets.map((r) => r[0]);
  const liabilityDates = liabilities.map((r) => r[0]);
  const times = [...assetDates, ...liabilityDates]
    .map((d) => d.getTime())
    .sort();
  const uniqueTimes = Array.from(new Set(times));

  return uniqueTimes.map((t) => new Date(t));
}
