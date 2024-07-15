import { render, screen } from '@testing-library/react';
import Card from '../../components/Card/Card';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Card', () => {
  it('should card clicked', async () => {
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
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
      };
    });

    const item = {
      birth_year: '132',
      created: new Date(),
      edited: new Date(),
      eye_color: 'red',
      films: [],
      gender: 'Male',
      hair_color: 'brown',
      height: '182',
      homeworld: 'Earth',
      mass: '64',
      name: 'Ben',
      skin_color: 'green',
      species: [],
      starships: [],
      url: '2/2/2',
      vehicles: [],
    };

    render(
      <Card
        card={item}
        currentElement="1"
        setCurrentElement={(string) => string}
      />,
    );

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(link);

    const name = screen.getByText('Ben');

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Ben');
  });

  it('should card acvtive', async () => {
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
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
      };
    });

    const item = {
      birth_year: '132',
      created: new Date(),
      edited: new Date(),
      eye_color: 'red',
      films: [],
      gender: 'Male',
      hair_color: 'brown',
      height: '182',
      homeworld: 'Earth',
      mass: '64',
      name: 'Ben',
      skin_color: 'green',
      species: [],
      starships: [],
      url: '1/1/1',
      vehicles: [],
    };

    render(
      <Card
        card={item}
        currentElement="1"
        setCurrentElement={(string) => string}
      />,
    );

    const name = screen.getByText('Ben');

    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Ben');
  });
});
