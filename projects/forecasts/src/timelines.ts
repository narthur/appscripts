import { getColNumbers } from './lib/getColNumbers';
import { rand } from './lib/rand';
import datePlusMonths from './lib/datePlusMonths';

const TIME_UNIT_COUNT = 12 * 10;

function simulateSteps(values: number[]): number[] {
  return Array.from({ length: TIME_UNIT_COUNT }, () => null).map(() =>
    rand(values)
  );
}

function generateTimelines(values: number[]): number[][] {
  return Array.from({ length: 100 }, () => null).map(() =>
    simulateSteps(values)
  );
}

function getProbability(
  target: number,
  i: number,
  timelines: number[][],
  startBalance: number
): number {
  return (
    timelines.filter((t) => {
      const numbers = t.slice(0, i);
      const sum = numbers.reduce((a, b) => a + b, startBalance);
      return sum >= target;
    }).length / timelines.length
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
  startDate: Date,
  startBalance: number
): Timelines {
  const validTargets = targets.filter(isTarget);
  const values = getColNumbers(history);
  const headers = ['Date', ...validTargets.map(([name]) => name)];
  const timelines = generateTimelines(values);
  const rows: [Date, ...number[]][] = Array.from(
    { length: TIME_UNIT_COUNT },
    (v, i): [Date, ...number[]] => [
      datePlusMonths(startDate, i),
      ...validTargets.map((t) =>
        getProbability(t[1], i, timelines, startBalance)
      )
    ]
  );

  return [headers, ...rows];
}
