import React from 'react';
import './Search.scss';
import { useLocalStorage } from '../../hooks';

type SearchProps = {
  searchHandler: (arg: string) => void;
};

function Search({ searchHandler }: SearchProps) {
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
      <button className="header-btn" onClick={() => searchHandler(value)}>
        Search
      </button>
    </div>
  );
}

export default Search;
