import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination', () => {
  it('should pagination clicked', async () => {
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
        Link: vi.isMockFunction,
      };
    });

    render(
      <Provider store={store}>
        <Pagination
          countElements={151}
          currentPage="1"
          currentElement="1"
          search=""
        />
      </Provider>,
    );
  });

  it('should pagination with current element', async () => {
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
        Link: vi.isMockFunction,
      };
    });

    render(
      <Provider store={store}>
        <Pagination
          countElements={151}
          currentPage="1"
          currentElement="1"
          search=""
        />
      </Provider>,
    );
  });
});
