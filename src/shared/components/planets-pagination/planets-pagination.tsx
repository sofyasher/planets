import React from 'react';
import { Pagination } from 'react-bootstrap';
import './planets-pagination.scss';
import { useNavigate } from 'react-router-dom';

const VISIBLE_MIDDLE_BUTTONS_MAX_COUNT = 3;

type PaginationProps = {
  active: number;
  count: number;
};

const middleButtonsElements = (
  middleButtons: number[],
  active: number,
  navigate: any,
) => {
  return (
    <>
      {middleButtons.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={active === pageNumber}
          onClick={() => navigate(`/?page=${pageNumber}`)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </>
  );
};

const getMiddleButtons = (active: number, count: number): number[] => {
  if (count <= 2) {
    return [];
  }

  if (count - 2 >= VISIBLE_MIDDLE_BUTTONS_MAX_COUNT) {
    if (active <= 2) {
      return [2, 3, 4];
    }
    if (active >= count - 2) {
      return [count - 3, count - 2, count - 1];
    }
    return [active - 1, active, active + 1];
  }

  let i = 2;
  let buttons = [];
  while (i < count) {
    buttons.push(i);
    i++;
  }
  return buttons;
};

const PlanetsPagination = ({ active, count }: PaginationProps) => {
  const navigate = useNavigate();
  const middleButtons: number[] = getMiddleButtons(active, count);
  const showLeftEllipsis = middleButtons[0] - 1 > 1;
  const showRightEllipsis =
    count - middleButtons[VISIBLE_MIDDLE_BUTTONS_MAX_COUNT - 1] > 1;
  const showLastNumber = count > 1;
  return (
    <Pagination>
      <Pagination.First
        onClick={() => navigate(`/?page=1`)}
        disabled={active === 1}
      />
      <Pagination.Prev
        onClick={() => navigate(`/?page=${active - 1}`)}
        disabled={active === 1}
      />
      <Pagination.Item
        key={1}
        active={active === 1}
        onClick={() => navigate(`/?page=1`)}
      >
        1
      </Pagination.Item>
      {showLeftEllipsis && <Pagination.Ellipsis disabled={true} />}
      {middleButtonsElements(middleButtons, active, navigate)}
      {showRightEllipsis && <Pagination.Ellipsis disabled={true} />}
      {showLastNumber && (
        <Pagination.Item
          key={count}
          active={active === count}
          onClick={() => navigate(`/?page=${count}`)}
        >
          {count}
        </Pagination.Item>
      )}
      <Pagination.Next
        onClick={() => navigate(`/?page=${active + 1}`)}
        disabled={active === count}
      />
      <Pagination.Last
        onClick={() => navigate(`/?page=${count}`)}
        disabled={active === count}
      />
    </Pagination>
  );
};

export default PlanetsPagination;
