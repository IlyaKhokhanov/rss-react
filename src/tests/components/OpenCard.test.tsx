import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { mockCard } from '../mock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import * as reduxHooks from '../../hooks';
import OpenCard from '../../components/OpenCard/OpenCard';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('OpenCard', () => {
  it('should open card', async () => {
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

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      currentElement: '1',
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    fetchMock.mockResponse(JSON.stringify(mockCard));

    render(
      <Provider store={store}>
        <OpenCard />
      </Provider>,
    );

    const head = await screen.getByRole('heading');
    const user = userEvent.setup();
    await user.click(head);

    const name = await screen.getByText('Ben');
    expect(name).toHaveTextContent('Ben');

    const checkbox = await screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should close card', async () => {
    vi.mock('next/router', async () => {
      return {
        ...vi.importMock('next/router'),
        useRouter: () => ({
          query: {
            page: '1',
            id: '1',
          },
          push: vi.fn(),
        }),
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      currentElement: '1',
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    fetchMock.mockResponse(JSON.stringify(mockCard));

    render(
      <Provider store={store}>
        <OpenCard />
      </Provider>,
    );

    const head = await screen.getByRole('heading');
    const user = userEvent.setup();
    await user.click(head);

    const name = await screen.getByText('Ben');
    expect(name).toHaveTextContent('Ben');

    const checkbox = await screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    const button = await screen.getByRole('button');
    await user.click(button);
  });
});
