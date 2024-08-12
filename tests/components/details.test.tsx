import { render } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockCard } from '../mock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Details from '../../app/routes/page.$page.details.$id';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Page', async () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  vi.mock('@remix-run/react', async () => {
    return {
      ...vi.importMock('@remix-run/react'),
      useRouter: () => ({
        push: vi.fn(),
      }),
      useParams: () => ({
        page: '1',
        id: '1',
      }),
      useSearchParams: () => [
        {
          get: vi.fn(),
        },
      ],
      Outlet: vi.isMockFunction,
      Link: vi.isMockFunction,
      useLoaderData: () => ({
        cardData: mockCard,
        page: '1',
        id: '',
        search: '',
      }),
    };
  });

  it('should render Page', async () => {
    fetchMock.mockResponse(JSON.stringify(mockCard));
    render(
      <Provider store={store}>
        <Details />
      </Provider>,
    );
  });
});
