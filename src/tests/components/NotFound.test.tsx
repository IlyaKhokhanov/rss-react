import { render, screen } from '@testing-library/react';
import NotFound from '../../components/NotFound/NotFound';

describe('NotFound', () => {
  it('should rendering "404: Page Not Found"', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404: Page Not Found');
  });
});
