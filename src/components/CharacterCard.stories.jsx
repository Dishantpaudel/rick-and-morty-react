import CharacterCard from './CharacterCard';
import '../style.css'; // Don't forget the global styles!

export default {
  title: 'RickAndMorty/CharacterCard',
  component: CharacterCard,
};

export const RickSanchez = {
  args: {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    origin: 'Earth (C-137)',
  },
};

export const DeadMorty = {
  args: {
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'Dead',
    species: 'Human',
    origin: 'Earth (C-137)',
  },
};
