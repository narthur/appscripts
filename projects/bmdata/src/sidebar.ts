import { getDocumentProperties } from './lib/properties';
import { showSidebar } from './lib/sheets';

export function sidebar(): void {
  const data = getDocumentProperties();
  showSidebar('Settings', 'settings', data);
}
