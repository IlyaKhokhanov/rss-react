import { render, screen } from '@testing-library/react';
import Search from '../../components/Search/Search';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  it('should render component', () => {
    render(<Search searchHandler={(text) => text} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Search');
  });

  it('should check input', async () => {
    render(<Search searchHandler={(text) => text} />);

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
