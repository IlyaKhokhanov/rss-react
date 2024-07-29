import { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import List from '../List/List';
import Search from '../Search/Search';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import FlyoutElement from '../FlyoutElement/FlyoutElement';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setCountElements,
  setList,
  setLoading,
  setCurrentElement,
  setCurrentPage,
  setError,
} from '../../redux/slices/application';
import { requestAPI } from '../../redux/requestService';
import './MainPage.scss';
import { ThemeContext } from '../../context/ThemeContext';

function MainPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentPage, searchString, currentElement, hasError, isLoading } =
    useAppSelector((state) => state.application);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const queryList = requestAPI.useFetchAllItemsQuery({
    search: searchString,
    page: currentPage || 1,
  });

  useEffect(() => {
    dispatch(setCurrentPage(params.page ? +params.page : 1));
    dispatch(setCurrentElement(params.id ? params.id : null));
  }, [params, dispatch]);

  useEffect(() => {
    dispatch(setLoading(queryList.isLoading || queryList.isFetching));
    if (queryList.data) {
      dispatch(setList(queryList.data.results));
      dispatch(setCountElements(queryList.data.count));
    } else if (queryList.error) dispatch(setError(true));
  }, [
    queryList.data,
    queryList.isFetching,
    queryList.isLoading,
    queryList.error,
    dispatch,
  ]);

  useEffect(() => {
    if (currentElement) {
      navigate('/page/' + currentPage + '/details/' + currentElement);
    } else {
      navigate('/page/' + currentPage);
    }
  }, [currentPage, currentElement, navigate]);

  useEffect(() => {
    function addError() {
      if (hasError) throw new Error('Error');
    }
    addError();
  }, [hasError]);

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="buttons-wrapper">
        <button className="error-btn" onClick={() => dispatch(setError(true))}>
          Generate ERROR
        </button>
        <button className="theme-button" onClick={() => toggleTheme()}>
          {isDarkTheme ? 'Turn on a light theme' : 'Turn on the dark theme'}
        </button>
      </div>
      <Search />
      <div
        className="main"
        style={{ gridTemplateColumns: currentElement ? '1.5fr 1fr' : '1fr' }}
      >
        <div className="block-left">
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
      <FlyoutElement />
    </div>
  );
}

export default MainPage;
