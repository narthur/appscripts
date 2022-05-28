const rand = function <T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
};

const toDate = function (val: unknown): Date {
  if (val instanceof Date) return val;

  if (typeof val === 'string') {
    const date = new Date(val);
    if (date.toString() !== 'Invalid Date') return date;
  }

  if (typeof val === 'number') {
    const date = new Date(val * 24 * 60 * 60 * 1000);
    if (date.toString() !== 'Invalid Date') return date;
  }

  throw new Error(`Unable to parse date`);
};

export function SIMULATE(
  target: number,
  history: unknown[][],
  startDate: Date,
  startBalance: number,
  yearlyInterest: number
): Date[] {
  const vals = history
    .map((i) => i[0])
    .filter((i): i is number => typeof i === 'number');
  const weeklyInterest = yearlyInterest / 52;
  const start = toDate(startDate);

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

// RETURN array with len 100:
export function MYFORECAST(
  horizonCount: number,
  history: unknown[][],
  startBalance: number
): number[][] {
  const vals = history
    .map((i) => i[0])
    .filter((i): i is number => typeof i === 'number');

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
