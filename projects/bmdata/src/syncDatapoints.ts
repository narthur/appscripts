import { getGoal, getGoals } from './lib/beeminder';
import { appendRow, getSheetData } from './lib/sheets';

async function getSlugs(): Promise<string[]> {
  const goals: Goal[] = await getGoals();

  return goals.map((g) => g.slug);
}

async function getDatapoints(
  slug: string,
  since: number
): Promise<Datapoint[]> {
  const goal = await getGoal(slug, since);

  return goal.datapoints;
}

type Data = [string[], ...unknown[][]];

function getRowObjects<T extends Data>(data: T): Record<string, unknown>[] {
  const fields: string[] = data[0];
  const rows = data.slice(1);

  return rows.map((r: unknown[]) =>
    Object.fromEntries(fields.map((_, i) => [fields[i], r[i]]))
  );
}

function isKeyOfObject(
  key: string | number | symbol,
  obj: Record<string, unknown>
): key is keyof typeof obj {
  return key in obj;
}

function formatRow<T extends Record<string, T[K]>, K extends keyof T>(
  o: T,
  fields: (K | string)[]
): (T[K] | '')[] {
  return fields.map((f: K | string): T[K] | '' => {
    // If the field is a key of the object, return the value. Otherwise,
    // return an empty string.
    return isKeyOfObject(f, o) ? o[f] : '';
  });
}

async function formatDatapoints(
  slug: string,
  since: number
): Promise<(Datapoint & { slug: string })[]> {
  const datapoints = await getDatapoints(slug, since);
  return datapoints.map((p: Datapoint) => ({
    ...p,
    slug
  }));
}

function isData(data: unknown[][]): data is Data {
  if (!(data[0] instanceof Array)) {
    return false;
  }

  return data[0].every((s: unknown) => typeof s === 'string');
}

export async function syncDatapoints(): Promise<void> {
  const slugs = await getSlugs();

  if (!slugs.length) return;

  const since = Date.now() / 1000 - 3 * 24 * 60 * 60;
  const data = getSheetData('datapoints');

  if (!isData(data)) {
    throw new Error('Expected data');
  }

  const rows = getRowObjects(data);

  await Promise.all(
    slugs.map(async (s: string) => {
      const points = await formatDatapoints(s, since);
      points.forEach((p: Datapoint & { slug: string }) => {
        if (rows.filter((r) => r.id === p.id).length) return;
        const r = formatRow(p, data[0]);
        appendRow('datapoints', r);
      });
    })
  );
}
