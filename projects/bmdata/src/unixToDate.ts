export function UNIX_TO_DATE(input: unknown): ValueOrArray<Date | ''> {
  if (Array.isArray(input)) {
    return input.map(UNIX_TO_DATE);
  }

  if (typeof input === 'number') {
    return new Date(input * 1000);
  }

  if (input === '') return '';

  if (typeof input === 'string') {
    const num = parseInt(input);

    if (isNaN(num)) {
      return new Date(input);
    }

    return new Date(num * 1000);
  }

  throw new Error(`Cannot convert to Date`);
}
