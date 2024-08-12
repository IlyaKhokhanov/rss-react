import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import styles from './Search.module.scss';

function Search({
  currentId,
  search,
}: {
  currentId: string | null;
  search: string;
}) {
  const [state, setValue] = useState<string>();

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        defaultValue={search}
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
