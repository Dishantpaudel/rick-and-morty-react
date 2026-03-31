function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer glass-panel">
      <p className="footer-copy">
        Copyright {currentYear} Rick and Morty Explorer
      </p>

      <nav className="footer-links" aria-label="Social links">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer">
          X
        </a>
      </nav>

      <p className="footer-credit">
        API Credits:
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
          The Rick and Morty API
        </a>
      </p>
    </footer>
  );
}

export default AppFooter;
