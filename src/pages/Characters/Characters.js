import React from 'react';
import '../../Global.css';
import './Characters.css';
import Header from '../../Header/HeaderChar';
import CharacterCard from './CharactersCard';
import characters from './Data'

const Characters = () => {

  return (
    <div>
      <Header destination="/" />
      <h1 className='header-title'>Characters</h1>
      <div className="character-list">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

export default Characters;
