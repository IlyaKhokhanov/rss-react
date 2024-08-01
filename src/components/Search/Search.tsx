'use client';

import styles from './Search.module.scss';
import React, { useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { useRouter } from 'next/navigation';

function Search({
  page,
  currentId,
}: {
  page: string;
  currentId: string | null;
}) {
  const [state, setValue] = useLocalStorage('searchString', '');
  const router = useRouter();

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    router.push(
      `/page/${page}${currentId ? '/details/' + currentId : ''}${state ? `?search=${state}` : ''}`,
    );
  }, []);

  function clickHandler() {
    router.push(
      `/page/1${currentId ? '/details/' + currentId : ''}${state ? `?search=${state}` : ''}`,
    );
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        defaultValue={state}
        type="text"
        onChange={inputChange}
      />
      <button className={styles.btn} onClick={clickHandler}>
        Search
      </button>
    </div>
  );
}

export default Search;
