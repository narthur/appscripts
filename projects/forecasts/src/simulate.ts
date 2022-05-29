import { getColNumbers } from './lib/getColNumbers';
import { parseDate } from './lib/parseDate';
import { rand } from './lib/rand';

export function SIMULATE(
  target: number,
  history: unknown[][],
  startDate: Date,
  startBalance: number,
  yearlyInterest: number
): Date[] {
  const vals = getColNumbers(history);
  const weeklyInterest = yearlyInterest / 52;
  const start = parseDate(startDate);

  function calculateScenario(): Date {
    const limit = 200000;
    let weeks = 0;
    let balance = startBalance;
    while (balance < target && weeks < limit) {
      if (balance > 0) {
        balance *= 1 + weeklyInterest;
      }
      balance += rand(vals);
      weeks++;
    }
    if (balance >= target) {
      const date = new Date(start.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    throw new Error(`Unable to calculate scenario: [${weeks}] [${balance}]`);
  }

  const scenarios = new Array(100).fill(0).map(calculateScenario);

  scenarios.sort((a, b) => a.getTime() - b.getTime());

  return scenarios;
}
