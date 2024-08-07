import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../../components/Search/Search';
import { Providers } from '../../redux/provider';

describe('Search', () => {
  it('should check input', async () => {
    vi.mock('@remix-run/react', async () => {
      return {
        ...vi.importMock('@remix-run/react'),
        Link: vi.isMockFunction,
      };
    });

    render(
      <Providers>
        <Search currentId="1" />
      </Providers>,
    );

    const input = screen.getByRole('textbox');

    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard('hello');

    expect(input).toHaveValue('hello');
  });
});
