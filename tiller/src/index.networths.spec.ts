import { NETWORTHS } from './index';
import { HEADER } from './constants';
import liabilities from './data/liabilities.json';

function parseJsonRows(rows: string[][]): DataRow[] {
  return rows.map(
    (r: string[]): DataRow => [
      new Date(r[0]),
      ...r
        .slice(1)
        .map((c: string): '' | number =>
          c === '' ? '' : Number(c.replace(/[^0-9.-]+/g, ''))
        )
    ]
  );
}

function assertNetWorths({
  assets,
  liabilities,
  rows
}: {
  assets?: AssetRow[];
  liabilities?: LiabilityRow[];
  rows: NetWorthRow[];
}): void {
  expect(NETWORTHS(assets || [], liabilities || [])).toEqual([HEADER, ...rows]);
}

describe('Tiller', () => {
  it('returns only headers if no data', () => {
    assertNetWorths({ rows: [] });
  });

  it('sums assets', () => {
    assertNetWorths({
      assets: [[new Date('2/5/22'), 1]],
      rows: [[new Date('2/5/22'), 1, 0, 1, 0]]
    });
  });

  it('calculates net worth', () => {
    assertNetWorths({
      assets: [[new Date('2/5/22'), 1]],
      liabilities: [[new Date('2/5/22'), 1]],
      rows: [[new Date('2/5/22'), 1, -1, 0, 0]]
    });
  });

  it('handles no assets', () => {
    assertNetWorths({
      liabilities: [[new Date('2/5/22'), 1]],
      rows: [[new Date('2/5/22'), 0, -1, -1, 0]]
    });
  });

  it('handles unset asset', () => {
    assertNetWorths({
      assets: [
        [new Date('2/5/22'), 1],
        [new Date('2/6/22'), '']
      ],
      rows: [
        [new Date('2/5/22'), 1, 0, 1, 0],
        [new Date('2/6/22'), 1, 0, 1, 0]
      ]
    });
  });

  it('sums multiple asset accounts', () => {
    assertNetWorths({
      assets: [[new Date('2/5/22'), 1, 1]],
      liabilities: [],
      rows: [[new Date('2/5/22'), 2, 0, 2, 0]]
    });
  });

  it('sums multiple liability accounts', () => {
    assertNetWorths({
      assets: [],
      liabilities: [[new Date('2/5/22'), 1, 1]],
      rows: [[new Date('2/5/22'), 0, -2, -2, 0]]
    });
  });

  it('handles empty row', () => {
    expect(NETWORTHS([['', '']], [])).toEqual([HEADER]);
  });

  it('handles unset asset with missing rows', () => {
    assertNetWorths({
      assets: [
        [new Date('3/7/22'), 1],
        [new Date('3/11/22'), '']
      ],
      liabilities: [],
      rows: [
        [new Date('3/7/22'), 1, 0, 1, 0],
        [new Date('3/8/22'), 1, 0, 1, 0],
        [new Date('3/9/22'), 1, 0, 1, 0],
        [new Date('3/10/22'), 1, 0, 1, 0],
        [new Date('3/11/22'), 1, 0, 1, 0]
      ]
    });
  });

  it('calculates net worths with missing rows', () => {
    expect(
      NETWORTHS(
        [
          [new Date('3/7/22'), 1],
          [new Date('3/11/22'), 2]
        ],
        []
      )
    ).toEqual([
      HEADER,
      [new Date('3/7/22'), 1, 0, 1, 0],
      [new Date('3/8/22'), 1, 0, 1, 0],
      [new Date('3/9/22'), 1, 0, 1, 0],
      [new Date('3/10/22'), 1, 0, 1, 0],
      [new Date('3/11/22'), 2, 0, 2, 1]
    ]);
  });

  it('handles account init with missing rows', () => {
    assertNetWorths({
      assets: [
        [new Date('3/7/22'), ''],
        [new Date('3/11/22'), 2]
      ],
      liabilities: [],
      rows: [
        [new Date('3/7/22'), 0, 0, 0, 0],
        [new Date('3/8/22'), 0, 0, 0, 0],
        [new Date('3/9/22'), 0, 0, 0, 0],
        [new Date('3/10/22'), 0, 0, 0, 0],
        [new Date('3/11/22'), 2, 0, 2, 0]
      ]
    });
  });

  it('handles liabilities with missing rows', () => {
    expect(
      NETWORTHS(
        [],
        [
          [new Date('3/7/22'), 1],
          [new Date('3/11/22'), 2]
        ]
      )
    ).toEqual([
      HEADER,
      [new Date('3/7/22'), 0, -1, -1, 0],
      [new Date('3/8/22'), 0, -1, -1, 0],
      [new Date('3/9/22'), 0, -1, -1, 0],
      [new Date('3/10/22'), 0, -1, -1, 0],
      [new Date('3/11/22'), 0, -2, -2, -1]
    ]);
  });

  it('handles unset values in multiple asset accounts', () => {
    expect(
      NETWORTHS(
        [
          [new Date('3/14/22'), '', 1726.93],
          [new Date('3/15/22'), 2008.86, '']
        ],
        [[''], ['']]
      )
    ).toEqual([
      HEADER,
      [new Date('3/14/22'), 1726.93, 0, 1726.93, 0],
      [new Date('3/15/22'), 3735.79, 0, 3735.79, 0]
    ]);
  });

  it('handles unset values in multiple asset accounts again', () => {
    expect(
      NETWORTHS(
        [
          [new Date('1/13/22'), 2008.86, 4121.93],
          [new Date('1/14/22'), '', 1726.93],
          [new Date('1/15/22'), 2008.86, '']
        ],
        [[''], ['']]
      )
    ).toEqual([
      HEADER,
      [new Date('1/13/22'), 6130.79, 0, 6130.79, 0],
      [new Date('1/14/22'), 3735.79, 0, 3735.79, -2395],
      [new Date('1/15/22'), 3735.79, 0, 3735.79, 0]
    ]);
  });

  it('handles unset value in middle of assets with missing rows', () => {
    expect(
      NETWORTHS(
        [
          [new Date('3/7/22'), 1],
          [new Date('3/8/22'), ''],
          [new Date('3/11/22'), 2]
        ],
        []
      )
    ).toEqual([
      HEADER,
      [new Date('3/7/22'), 1, 0, 1, 0],
      [new Date('3/8/22'), 1, 0, 1, 0],
      [new Date('3/9/22'), 1, 0, 1, 0],
      [new Date('3/10/22'), 1, 0, 1, 0],
      [new Date('3/11/22'), 2, 0, 2, 1]
    ]);
  });

  it('handles inactive asset account', () => {
    assertNetWorths({
      assets: [
        [new Date('1/13/22'), 100, 0],
        [new Date('1/14/22'), 200, 0]
      ],
      liabilities: [],
      rows: [
        [new Date('1/13/22'), 100, 0, 100, 0],
        [new Date('1/14/22'), 200, 0, 200, 100]
      ]
    });
  });

  it('calculates delta correctly', () => {
    const assets: AssetRow[] = [
      [
        new Date('4/29/22'),
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        8107.39,
        0.0,
        5637.75,
        459.85,
        158.72
      ],
      [
        new Date('4/30/22'),
        '',
        1941.8,
        0.0,
        0.0,
        0.0,
        0.0,
        2973.95,
        3148.88,
        8160.99,
        0.0,
        5685.24,
        '',
        158.72
      ],
      [
        new Date('5/1/22'),
        '',
        1941.8,
        0.0,
        0.0,
        0.0,
        0.0,
        2973.95,
        3148.88,
        8062.84,
        0.0,
        '',
        459.85,
        158.72
      ],
      [
        new Date('5/2/22'),
        '',
        1941.8,
        0.0,
        0.0,
        0.0,
        0.0,
        2973.95,
        '',
        8062.84,
        0.0,
        5603.53,
        458.06,
        ''
      ]
    ];
    const result = NETWORTHS(assets, []);

    expect(result).toEqual([
      HEADER,
      [new Date('4/29/22'), 14363.71, 0, 14363.71, 0],
      [new Date('4/30/22'), 22529.43, 0, 22529.43, 101.08999999999924],
      [new Date('5/1/22'), 22431.28, 0, 22431.28, -98.14999999999964],
      [
        new Date('5/2/22'),
        22347.780000000002,
        0,
        22347.780000000002,
        -83.50000000000006
      ]
    ]);
  });

  it('includes missing dates', () => {
    const assets: AssetRow[] = [
      [new Date('1/13/22'), 100, 0],
      [new Date('1/15/22'), 200, 0]
    ];
    const result = NETWORTHS(assets, []);

    expect(result).toEqual([
      HEADER,
      [new Date('1/13/22'), 100, 0, 100, 0],
      [new Date('1/14/22'), 100, 0, 100, 0],
      [new Date('1/15/22'), 200, 0, 200, 100]
    ]);
  });

  it('produces consistent results with test data', () => {
    const l = parseJsonRows(liabilities as string[][]);

    const result = NETWORTHS([], l);

    const rows: NetWorthRow[] = result.slice(1) as NetWorthRow[];

    rows.forEach((r, i) => {
      if (i === 0) return false;
      const prev = rows[i - 1];
      const prevNetWorth = prev[3];
      const netWorth = r[3];
      const delta = r[4];
      const expectedDelta = netWorth - prevNetWorth;

      if (delta - expectedDelta >= 0.01) {
        console.log(expectedDelta, delta);
        console.log({ [i - 1]: prev, [i]: r });
      }

      expect(delta - expectedDelta).toBeLessThan(0.01);
    });
  });
});
