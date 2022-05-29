export function getColNumbers(column: unknown[][]): number[] {
  return column
    .map((i) => i[0])
    .filter((i): i is number => typeof i === 'number');
}
