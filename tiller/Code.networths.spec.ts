import { NETWORTHS } from './Code';
import { HEADER } from './Code';

function assertEquals(a: unknown, b: unknown): void {
  expect(a).toEqual(b);
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
  assertEquals(NETWORTHS(assets || [], liabilities || []), [HEADER, ...rows]);
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
    assertEquals(NETWORTHS([['', '']], []), [HEADER]);
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
    assertEquals(
      NETWORTHS(
        [
          [new Date('3/7/22'), 1],
          [new Date('3/11/22'), 2]
        ],
        []
      ),
      [
        HEADER,
        [new Date('3/7/22'), 1, 0, 1, 0],
        [new Date('3/11/22'), 2, 0, 2, 1]
      ]
    );
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
    assertEquals(
      NETWORTHS(
        [],
        [
          [new Date('3/7/22'), 1],
          [new Date('3/11/22'), 2]
        ]
      ),
      [
        HEADER,
        [new Date('3/7/22'), 0, -1, -1, 0],
        [new Date('3/11/22'), 0, -2, -2, -1]
      ]
    );
    assertEquals(
      NETWORTHS(
        [
          [new Date('3/7/22'), 1],
          [new Date('3/8/22'), ''],
          [new Date('3/11/22'), 2]
        ],
        []
      ),
      [
        HEADER,
        [new Date('3/7/22'), 1, 0, 1, 0],
        [new Date('3/8/22'), 1, 0, 1, 0],
        [new Date('3/11/22'), 2, 0, 2, 1]
      ]
    );
    assertEquals(
      NETWORTHS(
        [
          [new Date('3/14/22'), '', 1726.93],
          [new Date('3/15/22'), 2008.86, '']
        ],
        [[''], ['']]
      ),
      [
        HEADER,
        [new Date('3/14/22'), 1726.93, 0, 1726.93, 0],
        [new Date('3/15/22'), 3735.79, 0, 3735.79, 0]
      ]
    );
    assertEquals(
      NETWORTHS(
        [
          [new Date('3/13/22'), 2008.86, 4121.93],
          [new Date('3/14/22'), '', 1726.93],
          [new Date('3/15/22'), 2008.86, '']
        ],
        [[''], ['']]
      ),
      [
        HEADER,
        [new Date('3/13/22'), 6130.79, 0, 6130.79, 0],
        [new Date('3/14/22'), 3735.79, 0, 3735.79, -2395],
        [new Date('3/15/22'), 3735.79, 0, 3735.79, 0]
      ]
    );
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
});
