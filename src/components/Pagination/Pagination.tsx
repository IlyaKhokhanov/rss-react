'use client';

import styles from './Pagination.module.scss';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const numbersArr = [];
  for (let i = 1; i <= Math.ceil(countElements / 10); i++) {
    numbersArr.push(i);
  }

  function clickHandler(el: number) {
    router.push(
      `/page/${el}${currentElement ? '/details/' + currentElement : ''}${search ? `?search=${search}` : ''}`,
    );
  }

  return (
    <ul className={styles.pagination}>
      {numbersArr.map((el) => (
        <li
          key={el}
          className={el === +currentPage ? styles.active : styles.item}
          onClick={() => clickHandler(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
