import { render, screen } from '@testing-library/react';
import React from 'react';
import OpenCard from '../../components/OpenCard/OpenCard';

describe('OpenCard', () => {
  it('shoud be empty card', async () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        useLocation: () => ({
          search: '',
          pathname: ' ',
        }),
        useNavigate: () => vi.fn(),
        matchPath: vi.fn(),
        withRouter: vi.fn(),
        useRouteMatch: vi.fn(),
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
      };
    });

    render(<OpenCard />);

    const name = screen.getByText('Loading...');

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Loading...');
  });

  it('should card clicked', async () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useLocation: () => ({
          search: '',
          pathname: '1/1/1/1/1/1/1/ ',
        }),
        useNavigate: () => vi.fn(),
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
      };
    });

    render(<OpenCard />);
  });
});
