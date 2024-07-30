import MainLayout from '../../../components/Layout/MainLayout';
import List from '../../../components/List/List';
import Pagination from '../../../components/Pagination/Pagination';
import { IRequestList } from '../../../types';

type pageType = {
  params: { page: string; id: string };
  searchParams: { search: string };
  children?: React.ReactNode;
};

async function getServerSideProps(
  page: string,
  search: string,
): Promise<IRequestList> {
  const res = await fetch(
    `https://swapi.dev/api/people/?page=${page}&search=${search ? search : ''}`,
  );
  return res.json();
}

async function Page({ params, searchParams, children }: Readonly<pageType>) {
  const listData = await getServerSideProps(params.page, searchParams.search);

  return (
    <MainLayout>
      <div className="block-left">
        <List
          list={listData.results ? listData.results : null}
          openId={params.id}
          page={params.page}
          search={searchParams.search}
        />
        <Pagination
          countElements={listData.count}
          currentPage={params.page}
          currentElement={params.id}
          search={searchParams.search}
        />
      </div>
      {children && children}
    </MainLayout>
  );
}

export default Page;
