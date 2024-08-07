import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import MainLayout from '../../components/Layout/MainLayout';
import FlyoutElement from '../../components/FlyoutElement/FlyoutElement';
import userEvent from '@testing-library/user-event';
import React from 'react';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('MainLayout', async () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

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

  it('should changed theme', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));
    render(
      <Provider store={store}>
        <MainLayout>
          <FlyoutElement />
        </MainLayout>
      </Provider>,
    );

    const buttons = screen.getAllByRole('button');
    const user = userEvent.setup();
    await user.click(buttons[1]);

    expect(buttons[1]).toHaveTextContent('Turn on a light theme');
  });
});
