import { getVisibleMiddleButtons } from './utils';

describe('getVisibleMiddleButtons tests', () => {
  const testCases: {
    visibleMiddleMaxCount?: number;
    active: number;
    total: number;
    result: number[];
  }[] = [
    {
      // << < 1 2 3 4 ... 6 > >>
      active: 1,
      total: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 2 3 4 ... 6 > >>
      active: 2,
      total: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 2 3 4 ... 6 > >>
      active: 3,
      total: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 ... 3 4 5 6 > >>
      active: 5,
      total: 6,
      result: [3, 4, 5],
    },
    {
      // << < 1 ... 3 4 5 6 > >>
      active: 6,
      total: 6,
      result: [3, 4, 5],
    },
    {
      // << < 1 ... 3 4 ... 6 > >>
      visibleMiddleMaxCount: 2,
      active: 3,
      total: 6,
      result: [3, 4],
    },
    {
      // << < 1 ... 5 6 7 ... 12 > >>
      active: 6,
      total: 12,
      result: [5, 6, 7],
    },
    {
      // << < 1 ... 6 7 8 ... 12 > >>
      active: 7,
      total: 12,
      result: [6, 7, 8],
    },
    {
      // << < 1 2 > >>
      active: 2,
      total: 2,
      result: [],
    },
    {
      // << < 1 2 3 4 > >>
      active: 3,
      total: 4,
      result: [2, 3],
    },
    {
      // << < 1 ... 5 6 7 8 ... 11 > >>
      visibleMiddleMaxCount: 4,
      active: 6,
      total: 11,
      result: [5, 6, 7, 8],
    },
    {
      // << < 1 ... 7 8 9 10 11 > >>
      visibleMiddleMaxCount: 4,
      active: 9,
      total: 11,
      result: [7, 8, 9, 10],
    },
    {
      // << < 1 > >>
      visibleMiddleMaxCount: 4,
      active: 1,
      total: 1,
      result: [],
    },
  ];

  testCases.forEach((testCase) => {
    it(`visibleMiddleMaxCount: ${
      testCase.visibleMiddleMaxCount
        ? testCase.visibleMiddleMaxCount
        : 'default'
    }, active: ${testCase.active}, total: ${
      testCase.total
    } -> ${testCase.result.toString()}`, () => {
      expect(
        getVisibleMiddleButtons(
          testCase.active,
          testCase.total,
          testCase.visibleMiddleMaxCount,
        ),
      ).toEqual(testCase.result);
    });
  });
});
