import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import Page from '../../pages/page/[page]';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import userEvent from '@testing-library/user-event';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Page', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  vi.mock('next/router', async () => {
    return {
      ...vi.importMock('next/router'),
      useRouter: () => ({
        query: {
          page: '1',
          id: '1',
        },
      }),
    };
  });

  it('should rendering Page', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));
    render(
      <Provider store={store}>
        <Page />
      </Provider>,
    );

    const header = await screen.getByRole('heading');
    expect(header).toHaveTextContent('Loading');

    const user = userEvent.setup();
    await user.click(header);

    console.log(screen.getAllByRole('listitem'));
  });
});
