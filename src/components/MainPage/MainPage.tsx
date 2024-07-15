import { useEffect } from 'react';
import { request } from '../../api';
import { IRequestList } from '../../types';
import List from '../List/List';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './MainPage.scss';
import {
  setCountElements,
  setList,
  setLoading,
  setCurrentElement,
  setCurrentPage,
  setError,
} from '../../redux/slices/application';

function MainPage() {
  const dispatch = useAppDispatch();
  const { currentPage, searchString, currentElement, hasError, isLoading } =
    useAppSelector((state) => state.application);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentPage(params.page ? +params.page : 1));
    dispatch(setCurrentElement(params.id ? params.id : null));
  }, [params]);

  function updateList() {
    dispatch(setLoading(true));
    if (currentPage)
      request<IRequestList>(
        `https://swapi.dev/api/people/?page=${currentPage}&search=${searchString}`,
      )
        .then((data) => {
          if (typeof data !== 'string') {
            dispatch(setList(data.results));
            dispatch(setLoading(false));
            dispatch(setCountElements(data.count));
          }
        })
        .catch((err) => console.error(err));
  }

  useEffect(() => {
    updateList();
  }, [currentPage, searchString]);

  useEffect(() => {
    function addError() {
      if (hasError) throw new Error('Error');
    }
    addError();
  }, [hasError]);

  useEffect(() => {
    if (currentElement) {
      navigate('/page/' + currentPage + '/details/' + currentElement);
    } else {
      navigate('/page/' + currentPage);
    }
  }, [currentPage, currentElement]);

  return (
    <div className="app">
      <button className="error-btn" onClick={() => dispatch(setError(true))}>
        Generate ERROR
      </button>
      <Search />
      <div className="main">
        <div
          className="block-left"
          style={{ width: currentElement ? '50%' : '100%' }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <List />
              <Pagination />
            </>
          )}
        </div>
        {currentElement && <Outlet />}
      </div>
    </div>
  );
}

export default MainPage;
