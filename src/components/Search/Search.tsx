import React from 'react';
import { useLocalStorage, useAppDispatch } from '../../hooks';
import { setSearchString } from '../../redux/slices/application';
import './Search.scss';

function Search() {
  const dispatch = useAppDispatch();
  const { value, setValue } = useLocalStorage('searchString', '');
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="header">
      <input
        className="header-input"
        defaultValue={value}
        type="text"
        onChange={inputChange}
      />
      <button
        className="header-btn"
        onClick={() => dispatch(setSearchString(value))}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
