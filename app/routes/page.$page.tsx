import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import MainLayout from '../../components/Layout/MainLayout';
import List from '../../components/List/List';
import Pagination from '../../components/Pagination/Pagination';

type pageType = {
  params: { page: string; id: string };
  request: { url: string };
  children?: React.ReactNode;
};

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
          openId={id}
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
      {/* {children && children} */}
    </MainLayout>
  );
}

export default Page;
