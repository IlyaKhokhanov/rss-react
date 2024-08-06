import { render, screen } from '@testing-library/react';
import RootLayout from '../../app/root';
import NotFound from '../../components/NotFound/NotFound';

describe('RootLayout', async () => {
  it('should rendering layout', async () => {
    render(
      <RootLayout>
        <NotFound />
      </RootLayout>,
    );

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404: Page Not Found');
  });
});
