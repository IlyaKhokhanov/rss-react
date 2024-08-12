import { render } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import App from '../../app/root';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('App', async () => {
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
    };
  });

  it('should render App', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });
});
