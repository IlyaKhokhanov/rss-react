import { useLocation, useNavigate } from 'react-router-dom';
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
}: PaginationProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
          onClick={() => {
            const arr = pathname.split('/');
            arr[2] = String(el);
            navigate(arr.join('/'));
          }}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
