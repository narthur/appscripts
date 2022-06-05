import { LAST as _LAST } from './last';
import { NETWORTHS as _NETWORTHS } from './networths';
import { HEADER } from './constants';

/**
 * Takes a list of values and returns the last value.
 *
 * @param {unknown[]} data - The list to be popped
 * @returns {unknown} The last value in the list
 * @customfunction
 */
function LAST<T>(data: T | [...unknown[], T]): T {
  return _LAST(data);
}

/**
 * Takes a sparse list of assets and liabilities and returns a list of networths
 * by date.
 *
 * @param {import("../types").AssetRow[]} assets - The list of assets
 * @param {import("../types").LiabilityRow[]} liabilities - The list of liabilities
 * @returns {[typeof HEADER, ...import("../types").NetWorthRow[]]} - A list of networths
 * @customfunction
 */
function NETWORTHS(
  assets: AssetRow[],
  liabilities: LiabilityRow[]
): [typeof HEADER, ...NetWorthRow[]] {
  return _NETWORTHS(assets, liabilities);
}
