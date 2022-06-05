import { MYFORECAST as _MYFORECAST } from './myforecast';
import { SIMULATE as _SIMULATE } from './simulate';
import { TIMELINES as _TIMELINES } from './timelines';

/**
 * Returns a list of forecasts in terms of the probability of meeting each.
 *
 * @param {number} horizonCount - number of time units to forecast
 * @param {number[][]} history - array of historical time-unit net worth deltas
 * @param {number} startBalance - starting net worth
 * @returns {number[][]} - array of forecasts
 * @customfunction
 */
function MYFORECAST(
  horizonCount: number,
  history: number[][],
  startBalance: number
): number[][] {
  return _MYFORECAST(horizonCount, history, startBalance);
}

/**
 * Returns 100 possible dates that the target will be met, in ascending order.
 *
 * @param {number} target - target value
 * @param {number[][]} history - array of historical weekly net worth deltas
 * @param {Date} startDate - start date
 * @param {number} startBalance - starting net worth
 * @param {number} yearlyInterest - yearly interest rate (0-1)
 * @returns {Date[]} - array of dates
 * @customfunction
 */
function SIMULATE(
  target: number,
  history: number[][],
  startDate: Date,
  startBalance: number,
  yearlyInterest: number
): Date[] {
  return _SIMULATE(target, history, startDate, startBalance, yearlyInterest);
}

/**
 * Returns a list of timelines in terms of the probability of meeting each
 * target by date.
 *
 * @param {[string, number][]} targets - array of target values
 * @param {number[][]} history - array of historical monthly net worth deltas
 * @param {Date} startDate - start date
 * @returns {import("../types").Timelines} - array of timelines
 * @customfunction
 */
function TIMELINES(
  targets: [string, number][],
  history: unknown[][],
  startDate: Date
): Timelines {
  return _TIMELINES(targets, history, startDate);
}
