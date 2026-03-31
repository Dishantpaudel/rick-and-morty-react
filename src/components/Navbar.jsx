import PropTypes from 'prop-types';

function Navbar({ searchQuery, onSearchChange }) {
  return (
    <header className="navbar glass-panel">
      <a href="#/" className="brand" aria-label="Go to home">
        <span className="brand-mark" aria-hidden="true">
          O
        </span>
        <span className="brand-text">Rick and Morty Nexus</span>
      </a>

      <div className="search-shell">
        <label htmlFor="global-search" className="visually-hidden">
          Search characters
        </label>
        <span className="search-icon" aria-hidden="true">
          /
        </span>
        <input
          id="global-search"
          type="search"
          className="nav-search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search the multiverse..."
          autoComplete="off"
        />
      </div>
    </header>
  );
}

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Navbar;
