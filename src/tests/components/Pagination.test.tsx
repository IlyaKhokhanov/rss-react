import { render, screen } from '@testing-library/react';
import Pagination from '../../components/Pagination/Pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination', () => {
  it('should rendering all ', () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        useLocation: () => ({
          search: '',
          pathname: ' /page/1/ ',
        }),
        useNavigate: () => vi.fn(),
        matchPath: vi.fn(),
        withRouter: vi.fn(),
        useRouteMatch: vi.fn(),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
      };
    });

    const state = {
      totalCount: 92,
      itemsPerPage: 10,
      currentPage: 1,
    };

    render(
      <Pagination
        currentPage={state.currentPage}
        itemsPerPage={state.itemsPerPage}
        totalCount={state.totalCount}
      />,
    );

    const elem = screen.getByText('10');
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveTextContent('10');

    const elements = screen.getAllByRole('listitem');
    expect(elements).toHaveLength(10);
  });

  it('should clicked links', async () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        useLocation: () => ({
          search: '',
          pathname: ' /page/1/ ',
        }),
        useNavigate: () => vi.fn(),
        matchPath: vi.fn(),
        withRouter: vi.fn(),
        useRouteMatch: vi.fn(),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
      };
    });

    const state = {
      totalCount: 5,
      itemsPerPage: 10,
      currentPage: 1,
    };

    render(
      <Pagination
        currentPage={state.currentPage}
        itemsPerPage={state.itemsPerPage}
        totalCount={state.totalCount}
      />,
    );

    const elem = screen.getByText('1');

    const user = userEvent.setup();
    await user.click(elem);

    expect(elem).toHaveTextContent('1');
  });
});
