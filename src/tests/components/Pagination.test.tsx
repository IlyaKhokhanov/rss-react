import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import userEvent from '@testing-library/user-event';
import Pagination from '../../components/Pagination/Pagination';

describe('Pagination', () => {
  it('should pagination clicked', async () => {
    vi.mock('next/navigation', async () => {
      return {
        ...vi.importMock('next/navigation'),
        useRouter: () => ({
          push: vi.fn(),
        }),
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

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(buttons).toHaveLength(16);
  });

  it('should pagination with current element', async () => {
    vi.mock('next/navigation', async () => {
      return {
        ...vi.importMock('next/navigation'),
        useRouter: () => ({
          push: vi.fn(),
        }),
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

    const buttons = screen.getAllByRole('listitem');
    const user = userEvent.setup();
    await user.click(buttons[0]);
    expect(buttons).toHaveLength(16);
  });
});
