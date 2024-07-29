import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useLocalStorage } from '../../hooks';
import { setSearchString } from '../../redux/slices/application';
import { useRouter } from 'next/navigation';

function Search() {
  const dispatch = useAppDispatch();
  const { searchString, currentElement } = useAppSelector(
    (state) => state.application,
  );
  const [state, setValue] = useLocalStorage('searchString', '');
  const router = useRouter();

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    dispatch(setSearchString(state));
    if (state) router.push('/page/' + 1);
  }, []);

  function clickHandler() {
    if (currentElement) {
      router.push('/page/' + 1 + '/details/' + currentElement);
    } else {
      router.push('/page/' + 1);
    }
    dispatch(setSearchString(state));
  }

  return (
    <div className="search">
      <input
        className="search-input"
        defaultValue={searchString}
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
