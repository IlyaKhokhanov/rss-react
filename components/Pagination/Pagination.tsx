import styles from './Pagination.module.scss';
import { Link } from '@remix-run/react';

type PaginationType = {
  countElements: number;
  currentPage: string;
  currentElement: string;
  search: string;
};

function Pagination({
  countElements,
  currentPage,
  currentElement,
  search,
}: PaginationType) {
  const numbersArr = [];
  for (let i = 1; i <= Math.ceil(countElements / 10); i++) {
    numbersArr.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {numbersArr.map((el) => (
        <Link
          key={el}
          className={el === +currentPage ? styles.active : styles.item}
          to={`/page/${el}${currentElement ? '/details/' + currentElement : ''}${search ? `?search=${search}` : ''}`}
        >
          {el}
        </Link>
      ))}
    </ul>
  );
}

export default Pagination;
