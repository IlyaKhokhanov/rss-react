import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { mockList } from '../mock';
import List from '../../components/List/List';
import * as reduxHooks from '../../hooks';

describe('List', () => {
  it('should render empty list', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      list: [],
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <List />
        </Provider>
      </MemoryRouter>,
    );

    const header = screen.getByText('List is empty');
    expect(header).toHaveTextContent('List is empty');
  });

  it('should render list with elements', () => {
    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      list: mockList.results,
      selectedList: [{ id: '2', url: '2/2/2/2', name: 'Fedya' }],
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <List />
        </Provider>
      </MemoryRouter>,
    );

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);
  });
});
