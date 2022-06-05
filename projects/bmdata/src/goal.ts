import { getGoal } from './lib/beeminder';

export async function GOAL(slug: string, days: number): Promise<unknown[][]> {
  const since = Date.now() / 1000 - days * 24 * 60 * 60;
  const g = await getGoal(slug, since);

  if (!g?.datapoints?.length) {
    return [];
  }

  const headers = Object.keys(g.datapoints[0]);
  const rows = g.datapoints.map((d) => Object.values(d));

  return [headers, ...rows];
}
