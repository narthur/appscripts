import { syncDatapoints as _syncDatapoints } from './syncDatapoints';
import { addMenuItem, showSidebar } from './lib/sheets';
import {
  getDocumentProperties,
  updateDocumentProperties
} from './lib/properties';
import { createTimeDrivenTrigger } from './lib/app';
import { syncUser as _syncUser } from './syncUser';

export function syncDatapoints(
  ...p: Parameters<typeof _syncDatapoints>
): ReturnType<typeof _syncDatapoints> {
  return _syncDatapoints(...p);
}

export function syncUser(
  ...p: Parameters<typeof _syncUser>
): ReturnType<typeof _syncUser> {
  return _syncUser(...p);
}

export function onOpen(): void {
  try {
    addMenuItem('Settings', 'sidebar');
    createTimeDrivenTrigger('cron', 1);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e as Error);
  }
}

export function sidebar(): void {
  const data = getDocumentProperties();
  showSidebar('Settings', 'settings', data);
}

export function processForm(data: { user: string; token: string }): void {
  updateDocumentProperties(data);
}

export function cron(): Promise<unknown> {
  return Promise.all([syncUser(), syncDatapoints()]);
}

type ValueOrArray<T> = T | ValueOrArray<T>[];

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
