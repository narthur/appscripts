import { addMenuItem } from './lib/sheets';
import { createTimeDrivenTrigger } from './lib/app';

export function onOpen(): void {
  try {
    addMenuItem('Settings', 'sidebar');
    createTimeDrivenTrigger('cron', 1);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e as Error);
  }
}
