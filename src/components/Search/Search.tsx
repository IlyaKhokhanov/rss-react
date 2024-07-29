import React, { useState } from 'react';
import './Search.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSearchString } from '../../redux/slices/application';

function Search() {
  const dispatch = useAppDispatch();
  const { searchString } = useAppSelector((state) => state.application);
  const [value, setValue] = useState(searchString);

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div className="header">
      <input
        className="header-input"
        defaultValue={searchString}
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
