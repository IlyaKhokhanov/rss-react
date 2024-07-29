import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
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

    const themeButton = await screen.getByText('Turn on the dark theme');
    const user = userEvent.setup();
    await user.click(themeButton);

    const card = screen.getByText('Pasha');
    await user.click(card);
  });
});
