import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { fetchCharacterById, fetchCharacters } from './api/rickAndMorty';

vi.mock('./api/rickAndMorty', () => ({
  fetchCharacters: vi.fn(),
  fetchCharacterById: vi.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.hash = '#/';

    fetchCharacterById.mockResolvedValue({
      id: 1,
      name: 'Rick Sanchez',
    });

    fetchCharacters.mockResolvedValue({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          status: 'Alive',
          species: 'Human',
          origin: { name: 'Earth (C-137)' },
        },
      ],
    });
  });

  it('renders heading and fetched character', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Rick and Morty Character Explorer'
    );
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(fetchCharacters).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        name: '',
        status: '',
      })
    );
  });
});
