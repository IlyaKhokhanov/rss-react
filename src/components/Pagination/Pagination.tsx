import React from 'react';
import './Pagination.scss';

type PaginationProps = {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (number: number) => void;
};

function Pagination({
  totalCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const numbersArr = [];

  for (let i = 1; i <= Math.ceil(totalCount / itemsPerPage); i++) {
    numbersArr.push(i);
  }

  return (
    <ul className="pagination">
      {numbersArr.map((el) => (
        <li
          key={el}
          className={
            el === currentPage ? 'pagination-item-active' : 'pagination-item'
          }
          onClick={() => setCurrentPage(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
