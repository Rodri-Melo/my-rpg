import React from 'react';
import { useParams } from 'react-router-dom';
import characters from './Data';
import Header from '../../Header/HeaderChar';
import './CharactersDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const character = characters.find((character) => character.id === parseInt(id));

  if (!character) {
    return <div>Personagem não encontrado.</div>;
  }

  return (
    <div className='infos-details'>
      <Header destination="/characters" />
      <h1 className="char-text-details">{character.name2}</h1>
      <h2 className='char-text-details'>{character.charClass}</h2>
      <img className="character-image-details" src={character.image2} alt={character.name} />

      <p className="char-text-details">{character.description}</p>
      <div className='abilities-details'>
        <h3>Habilidades:</h3>
        <ul>
          {Object.entries(character.skills).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className='atributes-details'>
        <h3>Atributos:</h3>
        <p>Life: {character.attributes.life}</p>
        <p>Attack: {character.attributes.attack}</p>
        <p>Defense: {character.attributes.defense}</p>
        <p>Speed: {character.attributes.speed}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;
