import { getUser } from './lib/beeminder';
import { appendRow } from './lib/sheets';

export async function syncUser(): Promise<void> {
  const user = await getUser();
  appendRow('user', [
    new Date().getTime() / 1000,
    user.goals.length,
    user.urgency_load
  ]);
}
