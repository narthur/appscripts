export function LAST<T>(data: T | [...unknown[], T]): T {
  if (!Array.isArray(data)) return data;
  return data[data.length - 1] as T;
}
