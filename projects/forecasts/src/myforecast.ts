import { getColNumbers } from './lib/getColNumbers';
import { rand } from './lib/rand';

// RETURN array with len 100:
export function MYFORECAST(
  horizonCount: number,
  history: unknown[][],
  startBalance: number
): number[][] {
  const vals = getColNumbers(history);

  function calculateScenario(): number[] {
    const limit = horizonCount;
    const balances = [startBalance];
    while (balances.length < limit) {
      balances.push(balances[balances.length - 1] + rand(vals));
    }
    return balances;
  }

  const scenarios = new Array(100).fill(0).map(calculateScenario);

  scenarios.sort((a, b) => a[a.length - 1] - b[b.length - 1]);

  return scenarios;
}
