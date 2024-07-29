import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import * as reduxHooks from '../../hooks';
import userEvent from '@testing-library/user-event';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination', () => {
  it('should pagination clicked', async () => {
    vi.mock('next/router', async () => {
      return {
        ...vi.importMock('next/router'),
        useRouter: () => ({
          push: vi.fn(),
        }),
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      countElements: 151,
      itemsPerPage: 10,
      currentPage: 1,
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(buttons).toHaveLength(16);
  });

  it('should pagination with current element', async () => {
    vi.mock('next/router', async () => {
      return {
        ...vi.importMock('next/router'),
        useRouter: () => ({
          push: vi.fn(),
        }),
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      countElements: 151,
      itemsPerPage: 10,
      currentPage: 1,
      currentElement: '1',
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(buttons).toHaveLength(16);
  });
});
