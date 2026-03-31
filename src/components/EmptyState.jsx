import PropTypes from 'prop-types';

function EmptyState({ query }) {
  return (
    <section className="empty-state glass-panel">
      <svg
        className="empty-icon"
        viewBox="0 0 120 120"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="60" cy="60" r="46" className="portal-ring" />
        <circle cx="60" cy="60" r="26" className="portal-core" />
      </svg>
      <h3>No characters found in this dimension</h3>
      <p>
        {query
          ? `No match for "${query}". Try a different keyword or status filter.`
          : 'Try a different status filter and search again.'}
      </p>
    </section>
  );
}

EmptyState.propTypes = {
  query: PropTypes.string.isRequired,
};

export default EmptyState;
