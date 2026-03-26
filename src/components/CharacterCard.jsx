import React from 'react';

const CharacterCard = ({ name, image, status, species, origin }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-info">
        <span className="status-badge">{status}</span>
        <h2>{name}</h2>
        <p>
          {species} from {origin}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
