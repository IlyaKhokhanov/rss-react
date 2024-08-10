import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import MainLayout from '../../components/Layout/MainLayout';
import List from '../../components/List/List';
import Pagination from '../../components/Pagination/Pagination';
// import { IRequestList } from '../../types';

type pageType = {
  params: { page: string; id: string };
  request: { url: string };
  children?: React.ReactNode;
};

// type responsePage = {
//   listData: IRequestList | null;
//   page: string;
//   id: string;
//   search: string;
// }; : Promise<TypedResponse<responsePage>>

export async function loader({ params, request }: pageType) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  const res = await fetch(
    `https://swapi.dev/api/people/?page=${params.page}&search=${search || ''}`,
  );
  const listData = await res.json();
  return json({
    listData,
    page: params.page,
    id: params.id || '',
    search: search || '',
  });
}

function Page() {
  const { listData, page, id, search } = useLoaderData<typeof loader>();
  return (
    <MainLayout>
      <div className="block-left">
        <List
          list={listData.results ? listData.results : null}
          page={page}
          search={search}
        />
        <Pagination
          countElements={listData.count}
          currentPage={page}
          currentElement={id}
          search={search}
        />
      </div>
      <Outlet />
    </MainLayout>
  );
}

export default Page;
