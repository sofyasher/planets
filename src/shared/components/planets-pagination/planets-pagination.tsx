import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';
import { planetsListNavigateUrl } from '../../utils';
import { PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT } from '../../constants';

type PaginationProps = {
  active: number;
  count: number;
  isDisabled: boolean;
};

const middleButtonsElements = (
  middleButtons: number[],
  active: number,
  navigate: any,
  isDisabled: boolean,
  searchString: string | null,
) => {
  return (
    <>
      {middleButtons.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={active === pageNumber}
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

const getVisibleMiddleButtons = (active: number, count: number): number[] => {
  const allMiddleButtonsCount = count - 2;

  if (allMiddleButtonsCount === 0) {
    return [];
  }

  if (allMiddleButtonsCount >= PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
    if (active <= PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
      return Array.from(
        { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
        (_, i) => i + 2,
      );
    }

    if (active >= count - PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT + 1) {
      return Array.from(
        { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
        (_, i) => i + count - PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT,
      );
    }

    return Array.from(
      { length: PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT },
      (_, i) =>
        i + active - PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT / 2 + 1,
    );
  }

  return Array.from({ length: allMiddleButtonsCount }, (_, i) => i + 2);
};

const PlanetsPagination = ({ active, count, isDisabled }: PaginationProps) => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchString = query.get('search');
  const middleButtons: number[] = getVisibleMiddleButtons(active, count);
  const showLeftEllipsis = middleButtons[0] - 1 > 1;
  const showRightEllipsis =
    count - middleButtons[PAGINATION_VISIBLE_MIDDLE_BUTTONS_MAX_COUNT - 1] > 1;
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
