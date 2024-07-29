import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { mockList } from '../mock';
import * as reduxHooks from '../../hooks';
import Card from '../../components/Card/Card';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  it('should card clicked', async () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card card={mockList.results[0]} />
        </Provider>
      </MemoryRouter>,
    );

    const card = screen.getByText('Ben');
    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(card);
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should card clicked checkbox', async () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      selectedList: [
        { id: '3', url: '3/3/3/3', name: 'Fedya' },
        { id: '4', url: '4/4/4/4/4', name: 'Fedya' },
      ],
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card card={mockList.results[0]} />
        </Provider>
      </MemoryRouter>,
    );

    const card = screen.getByText('Ben');
    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(card);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
