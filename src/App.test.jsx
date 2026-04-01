import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CharacterCard from './components/CharacterCard';
import Navbar from './components/Navbar';

describe('CharacterCard', () => {
  it('renders card content and high-priority image attributes', () => {
    render(
      <CharacterCard
        id={1}
        name="Rick Sanchez"
        image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        status="Alive"
        species="Human"
        origin="Earth (C-137)"
        priority
      />
    );

    const link = screen.getByRole('link', {
      name: 'Open details for Rick Sanchez',
    });
    const image = screen.getByRole('img', { name: 'Rick Sanchez' });

    expect(link).toHaveAttribute('href', '#/character/1');
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toHaveClass('status-alive');
    expect(image).toHaveAttribute('width', '300');
    expect(image).toHaveAttribute('height', '300');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });

  it('defaults to lazy loading when not prioritized', () => {
    render(
      <CharacterCard
        id={2}
        name="Morty Smith"
        image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
      />
    );

    const image = screen.getByRole('img', { name: 'Morty Smith' });
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('fetchpriority', 'auto');
  });
});

describe('Navbar', () => {
  it('emits search value changes through callback', () => {
    const onSearchChange = vi.fn();

    render(<Navbar searchQuery="" onSearchChange={onSearchChange} />);

    fireEvent.change(screen.getByLabelText('Search characters'), {
      target: { value: 'Morty' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('Morty');
  });
});
