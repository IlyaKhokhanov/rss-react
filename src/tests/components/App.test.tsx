import { render, screen } from '@testing-library/react';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockList } from '../mock';
import App from '../../App';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('App', () => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  it('should rendering Error', async () => {
    fetchMock.mockResponse(JSON.stringify(mockList));
    render(<App />);

    const head = await screen.getByRole('heading');
    expect(head).toHaveTextContent('Something went wrong');
  });
});
