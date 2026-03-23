import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // We use state to store the characters we fetch from the API
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component loads to fetch the data
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Rick and Morty Wiki</h1>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading characters...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {characters.map((char) => (
            <div
              key={char.id}
              style={{
                border: '1px solid #444',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#222',
                color: 'white',
              }}
            >
              <img
                src={char.image}
                alt={char.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <h3>{char.name}</h3>
              <p>
                {char.status === 'Alive'
                  ? '🟢'
                  : char.status === 'Dead'
                    ? '🔴'
                    : '⚪'}{' '}
                {char.status} - {char.species}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
