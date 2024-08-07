import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { mockList } from '../mock';
import * as reduxHooks from '../../hooks';
import Card from '../../components/Card/Card';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  it('should card clicked', async () => {
    vi.mock('@remix-run/react', async () => {
      return {
        ...vi.importMock('@remix-run/react'),
        useRouter: () => ({
          push: vi.fn(),
        }),
        useParams: () => ({
          page: '1',
          id: '1',
        }),
        Link: vi.isMockFunction,
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      selectedList: [
        { id: '1', url: '1/1/1/1', name: 'Fedya' },
        { id: '2', url: '2/2/2/2', name: 'Fedya' },
      ],
    });

    render(
      <Provider store={store}>
        <Card card={mockList.results[0]} openId="1" page="1" search="" />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should card clicked checkbox', async () => {
    vi.mock('@remix-run/react', async () => {
      return {
        ...vi.importMock('@remix-run/react'),
        useRouter: () => ({
          push: vi.fn(),
        }),
        useParams: () => ({
          page: '1',
          id: '1',
        }),
        Link: vi.isMockFunction,
      };
    });

    vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
      selectedList: [
        { id: '3', url: '3/3/3/3', name: 'Fedya' },
        { id: '4', url: '4/4/4/4/4', name: 'Fedya' },
      ],
    });

    render(
      <Provider store={store}>
        <Card card={mockList.results[0]} openId="1" page="1" search="" />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
