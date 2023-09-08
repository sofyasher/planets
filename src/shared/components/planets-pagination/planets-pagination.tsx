import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';
import { planetsListNavigateUrl } from '../../utils';
import { getVisibleMiddleButtons } from './planets-pagination-utils';

type PaginationProps = {
  activePageNumber: number;
  totalPagesCount: number;
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

const PlanetsPagination = ({
  activePageNumber,
  totalPagesCount,
  isDisabled,
}: PaginationProps) => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchString = query.get('search');
  const middleButtons: number[] = getVisibleMiddleButtons(
    activePageNumber,
    totalPagesCount,
  );
  // is shown when the difference between the page 1 and the first page from the middle section is greater than 1, f.e [1, ..., 3, 4, 5, 6]
  const showLeftEllipsis = middleButtons.length > 0 && middleButtons[0] - 1 > 1;
  // the same situation as above, but on the right side
  const showRightEllipsis =
    middleButtons.length > 0 &&
    totalPagesCount - middleButtons[middleButtons.length - 1] > 1;
  const showLastNumber = totalPagesCount > 1;
  return (
    <>
      {totalPagesCount > 0 && (
        <Pagination className='mb-4'>
          <Pagination.First
            tabIndex={-1}
            onClick={() =>
              navigate(
                planetsListNavigateUrl({ page: 1, search: searchString }),
              )
            }
            disabled={activePageNumber === 1 || isDisabled}
          />
          <Pagination.Prev
            tabIndex={-1}
            onClick={() =>
              navigate(
                planetsListNavigateUrl({
                  page: activePageNumber - 1,
                  search: searchString,
                }),
              )
            }
            disabled={activePageNumber === 1 || isDisabled}
          />
          <Pagination.Item
            tabIndex={-1}
            key={1}
            active={activePageNumber === 1}
            disabled={isDisabled}
            onClick={() =>
              navigate(
                planetsListNavigateUrl({ page: 1, search: searchString }),
              )
            }
          >
            1
          </Pagination.Item>
          {showLeftEllipsis && <Pagination.Ellipsis disabled={true} />}
          {middleButtonsElements(
            middleButtons,
            activePageNumber,
            navigate,
            isDisabled,
            searchString,
          )}
          {showRightEllipsis && <Pagination.Ellipsis disabled={true} />}
          {showLastNumber && (
            <Pagination.Item
              tabIndex={-1}
              key={totalPagesCount}
              active={activePageNumber === totalPagesCount}
              disabled={isDisabled}
              onClick={() =>
                navigate(
                  planetsListNavigateUrl({
                    page: totalPagesCount,
                    search: searchString,
                  }),
                )
              }
            >
              {totalPagesCount}
            </Pagination.Item>
          )}
          <Pagination.Next
            tabIndex={-1}
            onClick={() =>
              navigate(
                planetsListNavigateUrl({
                  page: activePageNumber + 1,
                  search: searchString,
                }),
              )
            }
            disabled={activePageNumber === totalPagesCount || isDisabled}
          />
          <Pagination.Last
            tabIndex={-1}
            onClick={() =>
              navigate(
                planetsListNavigateUrl({
                  page: totalPagesCount,
                  search: searchString,
                }),
              )
            }
            disabled={activePageNumber === totalPagesCount || isDisabled}
          />
        </Pagination>
      )}
    </>
  );
};

export default PlanetsPagination;
