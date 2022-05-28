export function getDates(
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): Date[] {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const times = [...assets, ...liabilities].map((r) => r[0].getTime());

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
