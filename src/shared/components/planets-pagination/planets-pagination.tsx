import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';
import { planetsListNavigateUrl } from '../../utils';
import { PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT } from '../../constants';

type PaginationProps = {
  active: number;
  count: number;
  isDisabled: boolean;
};

const middleButtonsElements = (
  middleButtonsNumbers: number[],
  activePageNumber: number,
  navigate: NavigateFunction,
  isDisabled: boolean,
  searchString: string | null,
) => {
  return (
    <>
      {middleButtonsNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={activePageNumber === pageNumber}
          disabled={isDisabled}
          onClick={() =>
            navigate(
              planetsListNavigateUrl({
                page: pageNumber,
                search: searchString,
              }),
            )
          }
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </>
  );
};

const getVisibleMiddleButtons = (
  activePageNumber: number,
  totalPagesCount: number,
): number[] => {
  const allMiddleButtonsCount = totalPagesCount - 2;

  if (allMiddleButtonsCount === 0) {
    return [];
  }

  if (allMiddleButtonsCount >= PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
    // if an active page number is not greater than maximum visible middle buttons count,
    // we can only insert pages [2, ..., maximum visible middle buttons count]
    if (activePageNumber <= PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
      return Array.from(
        { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
        (_, i) => i + 2,
      );
    }

    // the same situation as above, but on the right side
    if (
      activePageNumber >=
      totalPagesCount - PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT + 1
    ) {
      return Array.from(
        { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
        (_, i) =>
          i + totalPagesCount - PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT,
      );
    }

    // otherwise we add a half of allowed maximum visible middle buttons count to the right after the active page button
    // and the rest of buttons - to the left from the active button
    return Array.from(
      { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
      (_, i) =>
        i +
        activePageNumber -
        PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT / 2 +
        1,
    );
  }

  // if the middle button count is less than maximum visible middle buttons count, we only add all the buttons
  return Array.from({ length: allMiddleButtonsCount }, (_, i) => i + 2);
};

const PlanetsPagination = ({ active, count, isDisabled }: PaginationProps) => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchString = query.get('search');
  const middleButtons: number[] = getVisibleMiddleButtons(active, count);
  // is shown when the difference between the page 1 and the first page from the middle section is greater than 1, f.e [1,..., 3, 4, 5, 6]
  const showLeftEllipsis = middleButtons[0] - 1 > 1;
  // the same situation as above, but on the right side
  const showRightEllipsis = count - middleButtons[middleButtons.length - 1] > 1;
  const showLastNumber = count > 1;
  return (
    <Pagination>
      <Pagination.First
        onClick={() =>
          navigate(planetsListNavigateUrl({ page: 1, search: searchString }))
        }
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Prev
        onClick={() =>
          navigate(
            planetsListNavigateUrl({ page: active - 1, search: searchString }),
          )
        }
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Item
        key={1}
        active={active === 1}
        disabled={isDisabled}
        onClick={() =>
          navigate(planetsListNavigateUrl({ page: 1, search: searchString }))
        }
      >
        1
      </Pagination.Item>
      {showLeftEllipsis && <Pagination.Ellipsis disabled={true} />}
      {middleButtonsElements(
        middleButtons,
        active,
        navigate,
        isDisabled,
        searchString,
      )}
      {showRightEllipsis && <Pagination.Ellipsis disabled={true} />}
      {showLastNumber && (
        <Pagination.Item
          key={count}
          active={active === count}
          disabled={isDisabled}
          onClick={() =>
            navigate(
              planetsListNavigateUrl({ page: count, search: searchString }),
            )
          }
        >
          {count}
        </Pagination.Item>
      )}
      <Pagination.Next
        onClick={() =>
          navigate(
            planetsListNavigateUrl({ page: active + 1, search: searchString }),
          )
        }
        disabled={active === count || isDisabled}
      />
      <Pagination.Last
        onClick={() =>
          navigate(
            planetsListNavigateUrl({ page: count, search: searchString }),
          )
        }
        disabled={active === count || isDisabled}
      />
    </Pagination>
  );
};

export default PlanetsPagination;
