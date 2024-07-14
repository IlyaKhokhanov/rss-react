import { render, screen } from '@testing-library/react';
import Error from '../../components/Error/Error';

describe('Error', () => {
  it('should rendering "Something went wrong"', () => {
    render(<Error />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Something went wrong');
  });
});
