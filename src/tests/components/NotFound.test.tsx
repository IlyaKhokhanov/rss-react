import { render, screen } from '@testing-library/react';
import NotFound from '../../components/NotFound/NotFound';
import Details from '../../app/page/[page]/details/[id]/page';

describe('NotFound', () => {
  it('should rendering Page', async () => {
    await Details({
      params: { id: '1', page: '1' },
      searchParams: { search: '' },
    });
  });

  it('should rendering "404: Page Not Found"', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404: Page Not Found');
  });
});
