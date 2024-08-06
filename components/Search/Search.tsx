import styles from './Search.module.scss';
import React, { useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { redirect } from '@remix-run/react';

function Search({
  page,
  currentId,
}: {
  page: string;
  currentId: string | null;
}) {
  const [state, setValue] = useLocalStorage('searchString', '');

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    redirect(
      `/page/${page}${currentId ? '/details/' + currentId : ''}${state ? `?search=${state}` : ''}`,
    );
  }, []);

  function clickHandler() {
    redirect(
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
