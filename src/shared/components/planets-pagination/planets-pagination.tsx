import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';
import { planetsListNavigateUrl } from '../../utils';
import { getVisibleMiddleButtons } from './utils';

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
          tabIndex={-1}
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
        tabIndex={-1}
        onClick={() =>
          navigate(planetsListNavigateUrl({ page: 1, search: searchString }))
        }
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Prev
        tabIndex={-1}
        onClick={() =>
          navigate(
            planetsListNavigateUrl({ page: active - 1, search: searchString }),
          )
        }
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Item
        tabIndex={-1}
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
          tabIndex={-1}
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
        tabIndex={-1}
        onClick={() =>
          navigate(
            planetsListNavigateUrl({ page: active + 1, search: searchString }),
          )
        }
        disabled={active === count || isDisabled}
      />
      <Pagination.Last
        tabIndex={-1}
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
