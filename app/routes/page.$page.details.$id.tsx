import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import OpenCard from '../../components/OpenCard/OpenCard';
// import { requestObj } from '../../../../../types';

type detailsType = {
  params: { page: string; id: string };
  request: { url: string };
};

export async function loader({ params, request }: detailsType) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');

  const res = await fetch(`https://swapi.dev/api/people/${params.id}`);
  const cardData = await res.json();
  return json({
    cardData,
    page: params.page,
    id: params.id || '',
    search: search || '',
  });
}

function Details() {
  const { cardData, page, id, search } = useLoaderData<typeof loader>();

  return <OpenCard openCard={cardData} id={id} page={page} search={search} />;
}

export default Details;
