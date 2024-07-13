import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader/Loader';
import '@testing-library/jest-dom/vitest';

describe('Loader', () => {
  it('should rendering "Loading..."', () => {
    render(<Loader />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Loading...');
  });
});
