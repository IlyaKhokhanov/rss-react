import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../components/Search/Search';
import { Providers } from '../../redux/provider';

describe('Search', () => {
  it('should check input', async () => {
    vi.mock('next/navigation', async () => {
      return {
        ...vi.importMock('next/navigation'),
        useRouter: () => ({
          push: vi.fn(),
        }),
      };
    });

    render(
      <Providers>
        <Search currentId="1" page="1" />
      </Providers>,
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('hello');
    await user.click(button);

    expect(input).toHaveValue('hello');
    expect(button).toHaveTextContent('Search');
  });
});
