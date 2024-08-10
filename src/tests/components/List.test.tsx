import { render, screen } from '@testing-library/react';
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
      <Provider store={store}>
        <List />
      </Provider>,
    );

    const header = screen.getByText('List is empty');
    expect(header).toHaveTextContent('List is empty');
  });

  it('should render list with elements', () => {
    vi.mock('next/router', async () => {
      return {
        ...vi.importMock('next/router'),
        useRouter: () => ({
          push: vi.fn(),
        }),
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      list: mockList.results,
      selectedList: [{ id: '2', url: '2/2/2/2', name: 'Fedya' }],
    });

    render(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(3);
  });
});
