import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockCard } from '../mock';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MainPage from '../../components/MainPage/MainPage';
import OpenCard from '../../components/OpenCard/OpenCard';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('OpenCard', () => {
  it('should', async () => {
    fetchMock.mockResponse(JSON.stringify(mockCard));

    render(
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page" element={<MainPage />}>
              <Route path="details/:id" element={<OpenCard />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>,
    );
  });
});
