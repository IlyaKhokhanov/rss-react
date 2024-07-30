import OpenCard from '../../../../../components/OpenCard/OpenCard';
import { requestObj } from '../../../../../types';
import Page from '../../page';

type detailsType = {
  params: { page: string; id: string };
  searchParams: { search: string };
};

async function getServerSideProps(id: string): Promise<requestObj> {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  return res.json();
}

async function Details({ params, searchParams }: Readonly<detailsType>) {
  const cardData = await getServerSideProps(params.id);

  return (
    <Page params={params} searchParams={searchParams}>
      <OpenCard openCard={cardData} id={params.id} page={params.page} search={searchParams.search} />
    </Page>
  );
}

export default Details;
