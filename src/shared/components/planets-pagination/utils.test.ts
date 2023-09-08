import { getVisibleMiddleButtons } from './utils';

describe('getVisibleMiddleButtons tests', () => {
  const testCases: {
    visibleMiddleMaxCount?: number;
    active: number;
    total: number;
    result: number[];
  }[] = [
    {
      active: 3,
      total: 6,
      result: [2, 3, 4],
    },
    {
      visibleMiddleMaxCount: 2,
      active: 3,
      total: 6,
      result: [3, 4],
    },
  ]; //[0]: input: visibleMiddleButtonsMaxCount, activePageMumber, totalPagesCount, [1]: result

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
