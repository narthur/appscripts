export function findLastIndex(
  date: Date,
  rows: DataRow[],
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
