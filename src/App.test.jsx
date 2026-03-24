import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />);
    // This looks for an <h1> tag on the screen
    const heading = screen.getByRole('heading', { level: 1 });
    // This checks if the text inside the <h1> is correct
    expect(heading).toHaveTextContent('');
  });
});
