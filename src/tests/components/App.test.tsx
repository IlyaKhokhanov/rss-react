import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import Page from '../../pages/page/[page]';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('App', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  it('should rendering Error', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));
    render(
      <Provider store={store}>
        <Page />
      </Provider>,
    );

    console.log(await screen.getByRole('heading'));
    // expect(head).toHaveTextContent('Something went wrong');
  });
});
