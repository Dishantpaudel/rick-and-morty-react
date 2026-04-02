import Navbar from './Navbar';

export default {
  title: 'RickAndMorty/Navbar',
  component: Navbar,
};

export const Default = {
  args: {
    searchQuery: '',
    onSearchChange: () => {},
  },
};

export const WithSearchValue = {
  args: {
    searchQuery: 'Morty',
    onSearchChange: () => {},
  },
};
