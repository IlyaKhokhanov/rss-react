import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';

function Pagination() {
  const router = useRouter();

  const { countElements, itemsPerPage, currentPage, currentElement } =
    useAppSelector((state) => state.application);

  const numbersArr = [];
  for (let i = 1; i <= Math.ceil(countElements / itemsPerPage); i++) {
    numbersArr.push(i);
  }

  function clickHandler(el: number) {
    if (currentElement) {
      router.push({
        pathname: '/page/' + el + '/details/' + currentElement,
      });
    } else {
      router.push({
        pathname: '/page/' + el,
      });
    }
  }

  return (
    <ul className="pagination">
      {numbersArr.map((el) => (
        <li
          key={el}
          className={
            el === currentPage ? 'pagination-item-active' : 'pagination-item'
          }
          onClick={() => clickHandler(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
