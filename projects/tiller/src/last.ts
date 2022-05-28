export function LAST(data: unknown): unknown {
  if (!Array.isArray(data)) return data;
  return data[data.length - 1];
}
