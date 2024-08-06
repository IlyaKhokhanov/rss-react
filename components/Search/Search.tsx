import React, { useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { Link, redirect } from '@remix-run/react';
import styles from './Search.module.scss';

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

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        defaultValue={state}
        type="text"
        onChange={inputChange}
      />
      <Link
        className={styles.btn}
        to={`/page/1${currentId ? '/details/' + currentId : ''}${state ? `?search=${state}` : ''}`}
      >
        Search
      </Link>
    </div>
  );
}

export default Search;
