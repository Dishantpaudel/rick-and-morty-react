import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import EmptyState from '../components/EmptyState';
import HeroSection from '../components/HeroSection';
import SkeletonCard from '../components/SkeletonCard';
import { fetchCharacters } from '../api/rickAndMorty';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

function HomePage({ searchQuery }) {
  const [characters, setCharacters] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, statusFilter]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchCharacters({
          page,
          name: debouncedQuery,
          status: statusFilter,
          signal: controller.signal,
        });

        setCharacters(data.results);
        setPageInfo(data.info);
      } catch (fetchError) {
        if (fetchError?.name === 'AbortError') {
          return;
        }

        setError(fetchError?.message || 'Unable to load characters.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, page, requestVersion, statusFilter]);

  const noResults = !loading && !error && characters.length === 0;

  return (
    <main className="page-main">
      <HeroSection />

      <section className="toolbar glass-panel">
        <div className="toolbar-left">
          <label htmlFor="status-filter" className="visually-hidden">
            Filter by status
          </label>
          <select
            id="status-filter"
            className="status-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p className="results-count">{pageInfo.count} known characters</p>
      </section>

      {loading && (
        <section className="character-grid" aria-label="Loading characters">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </section>
      )}

      {!loading && error && (
        <section className="state-card" role="alert">
          <h2 className="state-title">Dimension Connection Failed</h2>
          <p>{error}</p>
          <button
            type="button"
            className="retry-button"
            onClick={() => setRequestVersion((value) => value + 1)}
          >
            Retry
          </button>
        </section>
      )}

      {!loading && !error && !noResults && (
        <section className="character-grid">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              status={character.status}
              species={character.species}
              origin={character.origin?.name}
              priority={index < 4}
            />
          ))}
        </section>
      )}

      {!loading && !error && noResults && <EmptyState query={searchQuery} />}

      {!loading && !error && pageInfo.pages > 1 && (
        <nav className="pagination" aria-label="Character pages">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={!pageInfo.prev}
          >
            Previous
          </button>
          <span className="page-indicator">
            Page {page} of {pageInfo.pages}
          </span>
          <button
            type="button"
            onClick={() => setPage((value) => value + 1)}
            disabled={!pageInfo.next}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}

HomePage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default HomePage;
