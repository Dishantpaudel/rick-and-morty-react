import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import './style.css'; // Ensure you have copied the professional CSS to this file

function App() {
  // State for data, loading, and search query
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from API on mount
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Rick and Morty data:', error);
        setLoading(false);
      });
  }, []);

  // Filter characters based on search input
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="app">
      {/* Header with Search Bar */}
      <header className="search-container">
        <h1>Rick and Morty (React)</h1>
        <input
          type="text"
          placeholder="Search for a character..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      <main id="center">
        {loading ? (
          <div className="loading">
            <div className="counter">Loading the Multiverse...</div>
          </div>
        ) : (
          <>
            {/* The Character Grid using our new component */}
            <div className="character-grid">
              {filteredCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  name={char.name}
                  image={char.image}
                  status={char.status}
                  species={char.species}
                  origin={char.origin.name}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredCharacters.length === 0 && (
              <div style={{ marginTop: '40px' }}>
                <p>No characters found in this dimension.</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer id="spacer">
        <div className="ticks"></div>
      </footer>
    </div>
  );
}

export default App;
