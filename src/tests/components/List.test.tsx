import { render, screen } from '@testing-library/react';
import List from '../../components/List/List';
import { IState } from '../../types';
import React from 'react';

type ListProps = {
  data: IState;
  setCurrentElement: (url: string) => void;
};

describe('List', () => {
  it('should render empty list', () => {
    const state: ListProps = {
      data: {
        currentElement: '1',
        list: [],
        searchString: '',
        isLoading: false,
        countElements: 10,
        itemsPerPage: 10,
        currentPage: 1,
        hasError: false,
      },
      setCurrentElement(url) {
        return url;
      },
    };

    render(
      <List data={state.data} setCurrentElement={state.setCurrentElement} />,
    );

    const elem = screen.getByText('List is empty');
    expect(elem).toBeInTheDocument();
    expect(elem).toHaveTextContent('List is empty');
  });

  it('should render some list', () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        useLocation: () => ({
          search: '',
          pathname: '/',
        }),
        useNavigate: vi.fn(),
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

    const state: ListProps = {
      data: {
        currentElement: '1',
        list: [
          {
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
          },
          {
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
            name: 'Pasha',
            skin_color: 'green',
            species: [],
            starships: [],
            url: '2/2/2',
            vehicles: [],
          },
          {
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
            name: 'Pasha',
            skin_color: 'green',
            species: [],
            starships: [],
            url: '2/2/2',
            vehicles: [],
          },
        ],
        searchString: '',
        isLoading: false,
        countElements: 10,
        itemsPerPage: 10,
        currentPage: 1,
        hasError: false,
      },
      setCurrentElement(url) {
        return url;
      },
    };

    render(
      <List data={state.data} setCurrentElement={state.setCurrentElement} />,
    );

    const elements = screen.getAllByRole('link');
    expect(elements).toHaveLength(2);
  });
});
