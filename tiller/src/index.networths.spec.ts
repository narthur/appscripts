import { NETWORTHS } from './index';
import { HEADER } from './constants';

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

  it('passes legacy tests', () => {
    assertNetWorths({
      assets: [
        [new Date('3/7/22'), 1],
        [new Date('3/11/22'), '']
      ],
      liabilities: [],
      rows: [
        [new Date('3/7/22'), 1, 0, 1, 0],
        [new Date('3/11/22'), 1, 0, 1, 0]
      ]
    });
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
      [new Date('3/11/22'), 2, 0, 2, 1]
    ]);
    assertNetWorths({
      assets: [
        [new Date('3/7/22'), ''],
        [new Date('3/11/22'), 2]
      ],
      liabilities: [],
      rows: [
        [new Date('3/7/22'), 0, 0, 0, 0],
        [new Date('3/11/22'), 2, 0, 2, 0]
      ]
    });
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
      [new Date('3/11/22'), 0, -2, -2, -1]
    ]);
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
      [new Date('3/11/22'), 2, 0, 2, 1]
    ]);
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
    expect(
      NETWORTHS(
        [
          [new Date('3/13/22'), 2008.86, 4121.93],
          [new Date('3/14/22'), '', 1726.93],
          [new Date('3/15/22'), 2008.86, '']
        ],
        [[''], ['']]
      )
    ).toEqual([
      HEADER,
      [new Date('3/13/22'), 6130.79, 0, 6130.79, 0],
      [new Date('3/14/22'), 3735.79, 0, 3735.79, -2395],
      [new Date('3/15/22'), 3735.79, 0, 3735.79, 0]
    ]);
    assertNetWorths({
      assets: [
        [new Date('3/13/22'), 100, 0],
        [new Date('3/14/22'), 200, 0]
      ],
      liabilities: [],
      rows: [
        [new Date('3/13/22'), 100, 0, 100, 0],
        [new Date('3/14/22'), 200, 0, 200, 100]
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
});
