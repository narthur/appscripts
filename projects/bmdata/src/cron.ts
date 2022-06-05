import { syncUser } from './syncUser';
import { syncDatapoints } from './syncDatapoints';

export function cron(): Promise<void> {
  return Promise.all([syncUser(), syncDatapoints()]).then(() => undefined);
}
