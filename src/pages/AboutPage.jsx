function AboutPage() {
  return (
    <main className="page-main">
      <section className="info-panel glass-panel">
        <p className="hero-kicker">About This Project</p>
        <h1 className="hero-title">Production-grade Rick and Morty Explorer</h1>
        <p className="hero-description">
          This edition is built with React, a custom glassmorphism design
          system, skeleton loading states, and route-level detail pages.
        </p>
        <p className="hero-description">
          Search in the navbar, filter by status, and open any character card to
          explore profile details.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
