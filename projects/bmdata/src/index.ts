import { syncDatapoints as _syncDatapoints } from './syncDatapoints';
import { addMenuItem, showSidebar } from './lib/sheets';
import {
  getDocumentProperties,
  updateDocumentProperties
} from './lib/properties';
import { createTimeDrivenTrigger } from './lib/app';

export function syncDatapoints(
  ...p: Parameters<typeof _syncDatapoints>
): ReturnType<typeof _syncDatapoints> {
  return _syncDatapoints(...p);
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

export function cron(): Promise<void> {
  return syncDatapoints();
}
