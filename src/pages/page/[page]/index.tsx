import { useEffect } from 'react';
import MainLayout from '../../../components/Layout/MainLayout';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';
import Pagination from '../../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchAllItems,
  fetchOneItem,
  requestAPI,
} from '../../../redux/requestService';
import {
  setCountElements,
  setCurrentElement,
  setCurrentPage,
  setError,
  setList,
  setLoading,
} from '../../../redux/slices/application';
import { useRouter } from 'next/router';
import { wrapper } from '../../../redux/store';

function Page({ children }: Readonly<{ children?: React.ReactNode }>) {
  const router = useRouter();
  const { query } = router;
  const dispatch = useAppDispatch();
  const { currentPage, searchString, hasError, isLoading } = useAppSelector(
    (state) => state.application,
  );

  const queryList = requestAPI.useFetchAllItemsQuery({
    search: searchString,
    page: currentPage || 1,
  });

  useEffect(() => {
    dispatch(setCurrentPage(query.page ? +query.page : 1));
    dispatch(setCurrentElement(query.id ? query.id : null));
  }, [query, dispatch]);

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
    function addError() {
      if (hasError) throw new Error('Error');
    }
    addError();
  }, [hasError]);

  return (
    <MainLayout>
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
      {children && children}
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search = '', page = '1', details } = context.query;

    let listData;
    if (typeof search === 'string' && typeof page === 'string') {
      listData = await store.dispatch(
        fetchAllItems.initiate({ search: search, page: Number(page) }),
      );
    }

    let listItem;
    if (details && typeof details === 'string') {
      listItem = await store.dispatch(fetchOneItem.initiate(details));
    }

    return {
      props: { listData: listData?.data, itemData: listItem?.data || null },
    };
  },
);

export default Page;
