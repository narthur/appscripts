import { MYFORECAST as _MYFORECAST } from './myforecast';
import { SIMULATE as _SIMULATE } from './simulate';

export function MYFORECAST(
  ...p: Parameters<typeof _MYFORECAST>
): ReturnType<typeof _MYFORECAST> {
  return _MYFORECAST(...p);
}

export function SIMULATE(
  ...p: Parameters<typeof _SIMULATE>
): ReturnType<typeof _SIMULATE> {
  return _SIMULATE(...p);
}
