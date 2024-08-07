import React from 'react';
import { useLocalStorage } from '../../hooks';
import { Link } from '@remix-run/react';
import styles from './Search.module.scss';

function Search({ currentId }: { currentId: string | null }) {
  const [state, setValue] = useLocalStorage('searchString', '');

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

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
        to={`/page/1${currentId ? '/details/' + currentId : ''}${Boolean(state) ? `?search=${state}` : ''}`}
      >
        Search
      </Link>
    </div>
  );
}

export default Search;
