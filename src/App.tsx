import { useEffect, useState } from 'react';
import { request } from './api';
import { IRequestList, IState } from './types';
import List from './components/List/List';
import Search from './components/Search/Search';
import Loader from './components/Loader/Loader';
import Pagination from './components/Pagination/Pagination';
import './App.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState<IState>({
    currentPage: +pathname.split('/')[2],
    searchString: localStorage.getItem('searchString') || '',
    list: [],
    isLoading: true,
    countElements: 0,
    itemsPerPage: 10,
    currentElement: pathname.split('/')[4] ? pathname.split('/')[4] : '',
    hasError: false,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentPage: +pathname.split('/')[2],
      currentElement: pathname.split('/')[4] ? pathname.split('/')[4] : '',
    }));
  }, [pathname]);

  function setSearchString(string: string) {
    localStorage.setItem('searchString', string);
    setState((prev) => ({
      ...prev,
      searchString: string,
    }));
    const arr = pathname.split('/');
    arr[2] = '1';
    navigate(arr.join('/'));
  }

  function setCurrentPage(number: number) {
    setState((prev) => ({
      ...prev,
      currentPage: number,
    }));
  }

  function setCurrentElement(url: string) {
    setState((prev) => ({
      ...prev,
      currentElement: url,
    }));
  }

  useEffect(() => {
    function updateList() {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      request<IRequestList>(
        `https://swapi.dev/api/people/?page=${state.currentPage}&search=${state.searchString}`,
      )
        .then((data) => {
          if (typeof data !== 'string') {
            setState((prev) => ({
              ...prev,
              list: data.results,
              isLoading: false,
              countElements: data.count,
            }));
          }
        })
        .catch((err) => console.error(err));
    }

    updateList();
  }, [state.searchString, state.currentPage]);

  useEffect(() => {
    function addError() {
      if (state.hasError) throw new Error('Error');
    }
    addError;
  }, [state.hasError]);

  return (
    <div className="app">
      <button
        className="error-btn"
        onClick={() => {
          setState((prev) => ({
            ...prev,
            hasError: true,
          }));
        }}
      >
        Generate ERROR
      </button>
      <Search searchHandler={setSearchString} />
      <div className="main">
        <div
          className="block-left"
          style={{ width: state.currentElement ? '50%' : '100%' }}
        >
          {state.isLoading ? (
            <Loader />
          ) : (
            <>
              <List data={state} setCurrentElement={setCurrentElement} />
              <Pagination
                totalCount={state.countElements}
                itemsPerPage={state.itemsPerPage}
                currentPage={state.currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
        {state.currentElement && <Outlet />}
      </div>
    </div>
  );
}

export default App;
