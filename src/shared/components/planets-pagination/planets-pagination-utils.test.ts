import { getVisibleMiddleButtons } from './planets-pagination-utils';

describe('getVisibleMiddleButtons tests', () => {
  const testCases: {
    visibleMiddleButtonsMaxCount?: number;
    activePageNumber: number;
    totalPagesCount: number;
    result: number[];
  }[] = [
    {
      // << < 1 2 3 4 ... 6 > >>
      activePageNumber: 1,
      totalPagesCount: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 2 3 4 ... 6 > >>
      activePageNumber: 2,
      totalPagesCount: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 2 3 4 ... 6 > >>
      activePageNumber: 3,
      totalPagesCount: 6,
      result: [2, 3, 4],
    },
    {
      // << < 1 ... 3 4 5 6 > >>
      activePageNumber: 5,
      totalPagesCount: 6,
      result: [3, 4, 5],
    },
    {
      // << < 1 ... 3 4 5 6 > >>
      activePageNumber: 6,
      totalPagesCount: 6,
      result: [3, 4, 5],
    },
    {
      // << < 1 ... 3 4 ... 6 > >>
      visibleMiddleButtonsMaxCount: 2,
      activePageNumber: 3,
      totalPagesCount: 6,
      result: [3, 4],
    },
    {
      // << < 1 ... 5 6 7 ... 12 > >>
      activePageNumber: 6,
      totalPagesCount: 12,
      result: [5, 6, 7],
    },
    {
      // << < 1 ... 6 7 8 ... 12 > >>
      activePageNumber: 7,
      totalPagesCount: 12,
      result: [6, 7, 8],
    },
    {
      // << < 1 2 > >>
      activePageNumber: 2,
      totalPagesCount: 2,
      result: [],
    },
    {
      // << < 1 2 3 4 > >>
      activePageNumber: 3,
      totalPagesCount: 4,
      result: [2, 3],
    },
    {
      // << < 1 ... 5 6 7 8 ... 11 > >>
      visibleMiddleButtonsMaxCount: 4,
      activePageNumber: 6,
      totalPagesCount: 11,
      result: [5, 6, 7, 8],
    },
    {
      // << < 1 ... 7 8 9 10 11 > >>
      visibleMiddleButtonsMaxCount: 4,
      activePageNumber: 9,
      totalPagesCount: 11,
      result: [7, 8, 9, 10],
    },
    {
      // << < 1 > >>
      visibleMiddleButtonsMaxCount: 4,
      activePageNumber: 1,
      totalPagesCount: 1,
      result: [],
    },
    {
      // << < 1 > >>
      visibleMiddleButtonsMaxCount: 4,
      activePageNumber: 1,
      totalPagesCount: 0,
      result: [],
    },
  ];

  testCases.forEach((testCase) => {
    it(`visibleMiddleMaxCount: ${
      testCase.visibleMiddleButtonsMaxCount
        ? testCase.visibleMiddleButtonsMaxCount
        : 'default'
    }, active: ${testCase.activePageNumber}, total: ${
      testCase.totalPagesCount
    } -> ${testCase.result.toString()}`, () => {
      expect(
        getVisibleMiddleButtons(
          testCase.activePageNumber,
          testCase.totalPagesCount,
          testCase.visibleMiddleButtonsMaxCount,
        ),
      ).toEqual(testCase.result);
    });
  });
});
