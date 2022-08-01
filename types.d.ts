type ValueOrArray<T> = T | ValueOrArray<T>[];

type HtmlOutput = ReturnType<typeof HtmlService['createHtmlOutput']>;

declare module 'gas-local' {
  export const require: <T>(module: string, mock?: unknown) => T;
  export const globalMockDefault: unknown;
}
