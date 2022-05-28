export function getDates(
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): Date[] {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const assetDates = assets.map((r) => r[0]);
  const liabilityDates = liabilities.map((r) => r[0]);
  const times = [...assetDates, ...liabilityDates]
    .map((d) => d.getTime())
    .sort();

  if (times.length === 0) {
    return [];
  }

  const startTime = Math.min(...times);
  const endTime = Math.max(...times) + 1;

  return Array.from(
    new Array(Math.ceil((endTime - startTime) / millisecondsPerDay)),
    (_, i) => new Date(startTime + i * millisecondsPerDay)
  );
}
