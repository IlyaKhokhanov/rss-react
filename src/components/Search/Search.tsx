import React, { useState } from 'react';
import './Search.scss';

type SearchProps = {
  searchHandler: (arg: string) => void;
};

function Search({ searchHandler }: SearchProps) {
  const [input, setInput] = useState(
    localStorage.getItem('searchString') || '',
  );

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="header">
      <input
        className="header-input"
        defaultValue={input}
        type="text"
        onChange={inputChange}
      />
      <button className="header-btn" onClick={() => searchHandler(input)}>
        Search
      </button>
    </div>
  );
}

export default Search;
