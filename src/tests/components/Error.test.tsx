import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from '../../components/Error/Error';
import '@testing-library/jest-dom/vitest';

describe('Error', () => {
  it('should rendering "Loading..."', () => {
    render(<Error />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Something went wrong');
  });
});
