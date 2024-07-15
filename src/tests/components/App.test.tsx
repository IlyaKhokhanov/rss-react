import { render, screen } from '@testing-library/react';
import App from '../../App';
import React from 'react';
import * as requestApi from '../../api';

describe('App', () => {
  it('should render App', () => {
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
        Outlet: vi.isMockFunction,
      };
    });

    render(<App />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();

    const button = screen.getByText('Generate ERROR');
    expect(button).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should visible elements App', async () => {
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
        Outlet: vi.isMockFunction,
      };
    });
    const mockResolveValue = [
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
    ];

    const setState = vi.fn();

    const fetchSpy = vi.spyOn(requestApi, 'request');

    const state = vi.spyOn(React, 'useState');

    state.mockReturnValue([mockResolveValue, setState]);

    fetchSpy.mockReturnValue(
      new Promise((resolve) => resolve(mockResolveValue)),
    );

    render(<App />);

    console.log(screen.getAllByRole('button'));
  });
});
