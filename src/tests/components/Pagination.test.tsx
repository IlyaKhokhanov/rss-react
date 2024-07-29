import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import * as reduxHooks from '../../hooks';
import userEvent from '@testing-library/user-event';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination', () => {
  it('should pagination clicked', async () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      countElements: 151,
      itemsPerPage: 10,
      currentPage: 1,
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </MemoryRouter>,
    );

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(buttons).toHaveLength(16);
  });
});
