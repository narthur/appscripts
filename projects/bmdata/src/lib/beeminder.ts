import fetchJson from './fetchJson';
import { getDocumentProperties } from './properties';

const base = `https://www.beeminder.com/api/v1/users/`;

const getAuth = (): { user: string; token: string } => {
  const { user, token } = getDocumentProperties();

  return {
    user,
    token
  };
};

const isGoal = (val: unknown): val is Goal =>
  val instanceof Object && 'slug' in val;

export async function getGoals(): Promise<Goal[]> {
  const { user, token } = getAuth();

  const result: unknown = await fetchJson(
    `${base}/${user}/goals.json?auth_token=${token}&filter=frontburner`
  );

  if (!(result instanceof Array)) {
    throw new Error('Expected array');
  }

  return result.filter(isGoal);
}

export async function getGoal(slug: string, since: number): Promise<Goal> {
  const { user, token } = getAuth();

  const result: unknown = await fetchJson(
    `${base}/${user}/goals/${slug}.json?auth_token=${token}&datapoints=true&diff_since=${since}`
  );

  if (!isGoal(result)) {
    throw new Error('Expected goal');
  }

  return result;
}
