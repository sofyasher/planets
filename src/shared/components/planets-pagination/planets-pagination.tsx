import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';

const VISIBLE_MIDDLE_BUTTONS_MAX_COUNT = 3;

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
          onClick={() => navigate(navigateUrl(pageNumber, searchString))}
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

  if (allMiddleButtonsCount >= VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
    if (active <= VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
      let i = 2;
      let buttons = [];
      while (i <= VISIBLE_MIDDLE_BUTTONS_MAX_COUNT + 1) {
        buttons.push(i);
        i++;
      }
      return buttons;
    }

    if (active >= count - VISIBLE_MIDDLE_BUTTONS_MAX_COUNT + 1) {
      let i = count - 1;
      let buttons = [];
      while (i >= count - VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
        buttons.push(i);
        i--;
      }
      return buttons.reverse();
    }

    let i = active + VISIBLE_MIDDLE_BUTTONS_MAX_COUNT / 2;
    let buttons = [];
    for (let j = i; j >= i - VISIBLE_MIDDLE_BUTTONS_MAX_COUNT + 1; j--) {
      buttons.push(j);
    }
    return buttons.reverse();
  }

  let i = 2;
  let buttons = [];
  while (i < count) {
    buttons.push(i);
    i++;
  }
  return buttons;
};

const navigateUrl = (page: number | null, search: string | null): string => {
  let url = '/?';
  if (page) {
    url = url.concat('page=' + page);
  }
  if (search) {
    url = url.concat('&search=' + search);
  }
  return url;
};

const PlanetsPagination = ({ active, count, isDisabled }: PaginationProps) => {
  const navigate = useNavigate();
  const query = useQuery();
  const searchString = query.get('search');
  const middleButtons: number[] = getVisibleMiddleButtons(active, count);
  const showLeftEllipsis = middleButtons[0] - 1 > 1;
  const showRightEllipsis =
    count - middleButtons[VISIBLE_MIDDLE_BUTTONS_MAX_COUNT - 1] > 1;
  const showLastNumber = count > 1;
  return (
    <Pagination>
      <Pagination.First
        onClick={() => navigate(navigateUrl(1, searchString))}
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Prev
        onClick={() => navigate(navigateUrl(active - 1, searchString))}
        disabled={active === 1 || isDisabled}
      />
      <Pagination.Item
        key={1}
        active={active === 1}
        disabled={isDisabled}
        onClick={() => navigate(navigateUrl(1, searchString))}
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
          onClick={() => navigate(navigateUrl(count, searchString))}
        >
          {count}
        </Pagination.Item>
      )}
      <Pagination.Next
        onClick={() => navigate(navigateUrl(active + 1, searchString))}
        disabled={active === count || isDisabled}
      />
      <Pagination.Last
        onClick={() => navigate(navigateUrl(count, searchString))}
        disabled={active === count || isDisabled}
      />
    </Pagination>
  );
};

export default PlanetsPagination;
