import { UNIX_TO_DATE } from './unixToDate';

describe('TO_DATE', () => {
  it('handles number', () => {
    const result = UNIX_TO_DATE(1);

    if (!(result instanceof Date)) {
      throw new Error('result is not instance of Date');
    }

    expect(result.getTime() / 1000).toEqual(1);
  });

  it('handles parses number string', () => {
    const result = UNIX_TO_DATE('1');

    if (!(result instanceof Date)) {
      throw new Error('result is not instance of Date');
    }

    expect(result.getTime() / 1000).toEqual(1);
  });
});
