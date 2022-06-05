import { getColNumbers } from './lib/getColNumbers';
import { rand } from './lib/rand';
import datePlusMonths from './lib/datePlusMonths';

function simulateSteps(values: number[]): number[] {
  return Array.from({ length: 52 * 10 }, () => null).map(() => rand(values));
}

function generateTimelines(values: number[]): number[][] {
  return Array.from({ length: 100 }, () => null).map(() =>
    simulateSteps(values)
  );
}

function getProbability(
  target: number,
  i: number,
  timelines: number[][]
): number {
  return (
    timelines.filter((t) => t.slice(0, i).reduce((a, b) => a + b, 0) >= target)
      .length / timelines.length
  );
}

const isTarget = (input: unknown): input is [string, number] => {
  return (
    Array.isArray(input) &&
    input.length === 2 &&
    typeof input[0] === 'string' &&
    typeof input[1] === 'number'
  );
};

export function TIMELINES(
  targets: unknown[][],
  history: unknown[][],
  startDate: Date
): Timelines {
  const validTargets = targets.filter(isTarget);
  const values = getColNumbers(history);
  const headers = ['Date', ...validTargets.map(([name]) => name)];
  const timelines = generateTimelines(values);
  const rows: [Date, ...number[]][] = Array.from(
    { length: 52 * 10 },
    (v, i): [Date, ...number[]] => [
      datePlusMonths(startDate, i),
      ...validTargets.map((t) => getProbability(t[1], i, timelines))
    ]
  );

  return [headers, ...rows];
}
