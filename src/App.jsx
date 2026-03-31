import { useEffect, useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppFooter from './components/AppFooter';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import HomePage from './pages/HomePage';
import './style.css';

function parseRoute(hashValue) {
  const hash = hashValue?.replace(/^#/, '') || '/';

  if (hash === '/' || hash === '') {
    return { name: 'home' };
  }

  if (hash === '/about') {
    return { name: 'about' };
  }

  const detailMatch = hash.match(/^\/character\/(\d+)$/);
  if (detailMatch) {
    return { name: 'character', id: detailMatch[1] };
  }

  return { name: 'not-found' };
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(() =>
    parseRoute(window.location.hash || '#/')
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const syncRoute = () => {
      setCurrentRoute(parseRoute(window.location.hash || '#/'));
    };

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    syncRoute();
    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (currentRoute.name !== 'home') {
      window.location.hash = '#/';
    }
  };

  const pageMeta = useMemo(() => {
    if (currentRoute.name === 'about') {
      return {
        title: 'Rick and Morty Portal | About',
        description:
          'Learn about the React edition of the Rick and Morty portal.',
      };
    }

    if (currentRoute.name === 'character') {
      return {
        title: 'Rick and Morty Portal | Character Details',
        description:
          'Detailed profile page for a Rick and Morty character in React.',
      };
    }

    if (currentRoute.name === 'not-found') {
      return {
        title: 'Rick and Morty Portal | Page Not Found',
        description: 'The page you requested was not found in this portal.',
      };
    }

    return {
      title: 'Rick and Morty Portal | React Edition',
      description:
        'Explore the Rick and Morty multiverse. Search, filter, and browse characters with React.',
    };
  }, [currentRoute.name]);

  return (
    <HelmetProvider>
      <div className="app-shell">
        <Helmet>
          <title>{pageMeta.title}</title>
          <meta name="description" content={pageMeta.description} />
          <link rel="preconnect" href="https://rickandmortyapi.com" />
        </Helmet>

        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        {currentRoute.name === 'home' && <HomePage searchQuery={searchQuery} />}
        {currentRoute.name === 'about' && <AboutPage />}
        {currentRoute.name === 'character' && (
          <CharacterDetailsPage characterId={currentRoute.id} />
        )}
        {currentRoute.name === 'not-found' && (
          <main className="page-main">
            <section className="state-card glass-panel">
              <h2 className="state-title">Page Not Found</h2>
              <p>This portal page does not exist in the current timeline.</p>
              <a href="#/" className="retry-button back-link">
                Go Home
              </a>
            </section>
          </main>
        )}

        <AppFooter />
      </div>
    </HelmetProvider>
  );
}

export default App;
