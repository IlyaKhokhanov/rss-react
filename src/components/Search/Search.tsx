'use client';

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
    <div className="search">
      <input
        className="search-input"
        defaultValue={state}
        type="text"
        onChange={inputChange}
      />
      <button className="search-btn" onClick={clickHandler}>
        Search
      </button>
    </div>
  );
}

export default Search;
