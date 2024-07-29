import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useLocalStorage } from '../../hooks';
import { setSearchString } from '../../redux/slices/application';

function Search() {
  const dispatch = useAppDispatch();
  const { searchString } = useAppSelector((state) => state.application);
  const [state, setValue] = useLocalStorage('searchString', '');

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    dispatch(setSearchString(state));
  }, []);

  return (
    <div className="search">
      <input
        className="search-input"
        defaultValue={searchString}
        type="text"
        onChange={inputChange}
      />
      <button
        className="search-btn"
        onClick={() => dispatch(setSearchString(state))}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
