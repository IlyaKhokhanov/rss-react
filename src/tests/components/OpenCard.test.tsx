import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { mockCard } from '../mock';
import { MemoryRouter } from 'react-router-dom';
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
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      currentElement: '1',
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    fetchMock.mockResponse(JSON.stringify(mockCard));

    render(
      <MemoryRouter initialEntries={['/page/1/details/1']}>
        <Provider store={store}>
          <OpenCard />
        </Provider>
      </MemoryRouter>,
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
});
