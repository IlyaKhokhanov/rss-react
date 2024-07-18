import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MainPage from '../../components/MainPage/MainPage';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('App', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  it('should render All App', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>,
    );

    const head = await screen.getByRole('heading');
    expect(head).toHaveTextContent('Loading');
  });
});
