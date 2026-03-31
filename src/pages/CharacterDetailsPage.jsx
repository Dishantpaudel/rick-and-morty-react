import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchCharacterById } from '../api/rickAndMorty';

function CharacterDetailsPage({ characterId }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacter = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await fetchCharacterById(characterId, {
          signal: controller.signal,
        });
        setCharacter(data);
      } catch (fetchError) {
        if (fetchError?.name === 'AbortError') {
          return;
        }
        setError(fetchError?.message || 'Unable to load character details.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacter();

    return () => {
      controller.abort();
    };
  }, [characterId, requestVersion]);

  return (
    <main className="page-main">
      <div className="page-actions">
        <a href="#/" className="retry-button back-link">
          Back to Portal
        </a>
      </div>

      {loading && (
        <section
          className="detail-card glass-panel detail-loading"
          aria-live="polite"
        >
          <div className="detail-image shimmer" />
          <div className="detail-content">
            <div className="skeleton-pill shimmer" />
            <div className="skeleton-line shimmer" />
            <div className="skeleton-line short shimmer" />
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="state-card glass-panel" role="alert">
          <h2 className="state-title">Character Signal Lost</h2>
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

      {!loading && !error && character && (
        <section className="detail-card glass-panel">
          <img
            src={character.image}
            alt={character.name}
            width="300"
            height="300"
            className="detail-image"
            style={{ aspectRatio: '1 / 1' }}
            loading="eager"
            fetchPriority="high"
          />

          <div className="detail-content">
            <span
              className={`status-pill status-${character.status.toLowerCase()}`}
            >
              <span className="status-dot" />
              {character.status}
            </span>
            <h1 className="hero-title detail-title">{character.name}</h1>
            <p className="hero-description">
              {character.species} - {character.gender}
            </p>

            <dl className="detail-grid">
              <div>
                <dt>Origin</dt>
                <dd>{character.origin?.name || 'Unknown'}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{character.location?.name || 'Unknown'}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{character.type || 'Unspecified'}</dd>
              </div>
              <div>
                <dt>Episodes</dt>
                <dd>{character.episode?.length || 0}</dd>
              </div>
            </dl>
          </div>
        </section>
      )}
    </main>
  );
}

CharacterDetailsPage.propTypes = {
  characterId: PropTypes.string.isRequired,
};

export default CharacterDetailsPage;
