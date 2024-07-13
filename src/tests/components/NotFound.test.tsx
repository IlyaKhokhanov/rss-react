import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../../components/NotFound/NotFound';
import '@testing-library/jest-dom/vitest';

describe('Error', () => {
  it('should rendering "Loading..."', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('404: Page Not Found');
  });
});
