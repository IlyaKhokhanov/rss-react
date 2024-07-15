import { render, screen } from '@testing-library/react';
import React from 'react';
import OpenCard from '../../components/OpenCard/OpenCard';
import * as requestApi from '../../api';

describe('OpenCard', () => {
  it('shoud be empty card', async () => {
    vi.mock('react-router-dom', async () => {
      return {
        ...vi.importMock('react-router-dom'),
        useLocation: () => ({
          search: '',
          pathname: ' ',
        }),
        useNavigate: () => vi.fn(),
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
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

    const mockResolveValue = {
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
      skin_color: 'string',
      species: [],
      starships: [],
      url: '1/1/1/1/1/1/1',
      vehicles: [],
    };

    const setState = vi.fn();

    const fetchSpy = vi.spyOn(requestApi, 'request');

    const state = vi.spyOn(React, 'useState');

    state.mockReturnValue([mockResolveValue, setState]);

    fetchSpy.mockReturnValue(
      new Promise((resolve) => resolve(mockResolveValue)),
    );

    render(<OpenCard />);
  });
});
