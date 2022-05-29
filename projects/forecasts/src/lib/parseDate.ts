export const parseDate = function (val: unknown): Date {
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
