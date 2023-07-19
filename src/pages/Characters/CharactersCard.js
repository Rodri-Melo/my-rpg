import React from 'react';
import './CharactersCard.css';
import { Link } from 'react-router-dom';
import { GiTemplarShield } from "react-icons/gi";
import { GiCrossedSwords } from "react-icons/gi";
import { GiHealthNormal } from "react-icons/gi";

const CharacterCard = ({ character }) => {
  let icon;
  let shield = 'black';
  let sword = 'black' 
  let sup = 'black'

  if (character.charClass === 'guardian') {
    icon = <GiTemplarShield color={shield} />;
  } else if (character.charClass === 'damager') {
    icon = <GiCrossedSwords color={sword} />;
  } else if (character.charClass === 'support') {
    icon = <GiHealthNormal color={sup} />;
  }

  return (
    <div className="character-card-page">
      <Link to={`/characters/${character.id}`}>
        <img className="character-image-page" src={character.image} alt={character.name} />
      </Link>
      <div className="character-name-page">
        {icon} {character.name}
      </div>
    </div>
  );
};

export default CharacterCard;
