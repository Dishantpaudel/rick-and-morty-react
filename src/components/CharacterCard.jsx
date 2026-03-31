import React from 'react';
import PropTypes from 'prop-types';

function CharacterCard({
  id,
  name,
  image,
  status = 'Unknown',
  species = 'Unknown species',
  origin = 'Unknown origin',
  priority = false,
}) {
  const normalizedStatus = status.toLowerCase();
  const statusClass =
    normalizedStatus === 'alive'
      ? 'status-alive'
      : normalizedStatus === 'dead'
        ? 'status-dead'
        : 'status-unknown';

  return (
    <a
      href={`#/character/${id}`}
      className="character-link"
      aria-label={`Open details for ${name}`}
    >
      <article className="character-card glass-panel">
        <img
          src={image}
          alt={name}
          width="300"
          height="300"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ aspectRatio: '1 / 1', width: '100%', height: 'auto' }}
        />
        <div className="card-body">
          <span className={`status-pill ${statusClass}`}>
            <span className="status-dot" />
            {status}
          </span>
          <h2 className="card-title">{name}</h2>
          <p className="card-meta">{species}</p>
          <p className="card-origin">{origin}</p>
        </div>
      </article>
    </a>
  );
}

CharacterCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string,
  species: PropTypes.string,
  origin: PropTypes.string,
  priority: PropTypes.bool,
};

export default React.memo(CharacterCard);
