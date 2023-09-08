export const PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT = 3;

/**
 * Depending on the total pages count, on the active page number and on the maximum visible middle buttons count,
 * the function returns an array of pages numbers, which should be visible in middle of pagination buttons, between ellipsis.
 * For input (6, 12, 3) the function will return [5, 6, 7], the resulted pagination buttons will be the following:
 * << < 1 ... 5 6 7 ... 12 > >>.
 * @param activePageNumber The number of active page
 * @param totalPagesCount The total pages count
 * @param visibleMiddleButtonsMaxCount The maximum count of visible middle buttons.
 */
export const getVisibleMiddleButtons = (
  activePageNumber: number,
  totalPagesCount: number,
  visibleMiddleButtonsMaxCount: number = PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT,
): number[] => {
  const allMiddleButtonsCount = totalPagesCount - 2;

  if (allMiddleButtonsCount === 0) {
    return [];
  }

  if (allMiddleButtonsCount >= visibleMiddleButtonsMaxCount) {
    // if an active page number is not greater than maximum visible middle buttons count,
    // we can only insert pages [2, ..., maximum visible middle buttons count]
    if (activePageNumber <= visibleMiddleButtonsMaxCount) {
      return Array.from(
        { length: visibleMiddleButtonsMaxCount },
        (_, i) => i + 2,
      );
    }

    // the same situation as above, but on the right side
    if (
      activePageNumber >=
      totalPagesCount - visibleMiddleButtonsMaxCount + 1
    ) {
      return Array.from(
        { length: visibleMiddleButtonsMaxCount },
        (_, i) => i + totalPagesCount - visibleMiddleButtonsMaxCount,
      );
    }

    // otherwise we add a half of allowed maximum visible middle buttons count to the right after the active page button
    // and the rest of buttons - to the left from the active button
    return Array.from(
      { length: visibleMiddleButtonsMaxCount },
      (_, i) =>
        i + activePageNumber - Math.round(visibleMiddleButtonsMaxCount / 2) + 1,
    );
  }

  // if the middle buttons count is less than maximum visible middle buttons count, we only add all the buttons
  return Array.from({ length: allMiddleButtonsCount }, (_, i) => i + 2);
};
