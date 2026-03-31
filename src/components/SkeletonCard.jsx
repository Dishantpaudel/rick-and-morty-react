function SkeletonCard() {
  return (
    <article
      className="character-card glass-panel skeleton-card"
      aria-hidden="true"
    >
      <div className="skeleton-media shimmer" />
      <div className="card-body">
        <div className="skeleton-pill shimmer" />
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line short shimmer" />
      </div>
    </article>
  );
}

export default SkeletonCard;
