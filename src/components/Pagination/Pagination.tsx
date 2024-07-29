import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../redux/slices/application';
import './Pagination.scss';

function Pagination() {
  const dispatch = useAppDispatch();
  const { countElements, itemsPerPage, currentPage } = useAppSelector(
    (state) => state.application,
  );

  const numbersArr = [];
  for (let i = 1; i <= Math.ceil(countElements / itemsPerPage); i++) {
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
          onClick={() => dispatch(setCurrentPage(el))}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
