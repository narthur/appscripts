import { LAST as _LAST } from './last';
import { NETWORTHS as _NETWORTHS } from './networths';

// Public functions need to be re-declared as functions in this file in order
// for Rollup to include them in the output file, and for Google Sheets to
// recognize them.

export function LAST(...p: Parameters<typeof _LAST>): ReturnType<typeof _LAST> {
  return _LAST(...p);
}

export function NETWORTHS(
  ...p: Parameters<typeof _NETWORTHS>
): ReturnType<typeof _NETWORTHS> {
  return _NETWORTHS(...p);
}
