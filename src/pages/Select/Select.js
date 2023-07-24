import React, { useEffect } from 'react';
import '../../Global.css';
import './Select.css';
import HeaderSelect from '../../Header/HeaderSelect';
import { Link } from 'react-router-dom';
import characters from '../Characters/Data';

function Select() {
  const [selectedCharacters, setSelectedCharacters] = React.useState(new Array(3).fill(null));
  const [selectedCharacter, setSelectedCharacter] = React.useState(null);

  useEffect(() => {
    localStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
  }, [selectedCharacters]);

  function handleCharacterClick(character) {
    const emptySquareIndex = selectedCharacters
      .slice()
      .reverse()
      .findIndex((char) => !char);

    if (emptySquareIndex !== -1) {
      const updatedCharacters = [...selectedCharacters];
      const actualIndex = selectedCharacters.length - 1 - emptySquareIndex;

      const isCharacterSelected = updatedCharacters
        .slice(0, actualIndex + 1)
        .some((char) => char && char.id === character.id);

      if (!isCharacterSelected) {
  
        const isAlreadySelected = updatedCharacters.some((char) => char && char.id === character.id);
        if (!isAlreadySelected) {
          updatedCharacters[actualIndex] = character;
          setSelectedCharacters(updatedCharacters);
          setSelectedCharacter(character);
        }
      }
    }
  }

  function removeCharacter(index) {
    setSelectedCharacters((prevCharacters) => {
      const updatedCharacters = [...prevCharacters];
      updatedCharacters[index] = null;
      return updatedCharacters;
    });
    localStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
  }

  function checkSelectedClasses() {
    const selectedGuardians = selectedCharacters.filter((character) => character?.charClass === 'guardian');
    const selectedDamagers = selectedCharacters.filter((character) => character?.charClass === 'damager');
    const selectedSupporters = selectedCharacters.filter((character) => character?.charClass === 'support');

    return (
      selectedGuardians.length === 1 &&
      selectedDamagers.length === 1 &&
      selectedSupporters.length === 1
    );
  }

  const isBattleButtonDisabled = !checkSelectedClasses();

  function isSelected(character) {
    return selectedCharacters.includes(character);
  }

  return (
    <div className='all'>
      <HeaderSelect />

      <div className="selected-characters-container">
        <div className="selected-characters">
          {selectedCharacters.map((character, index) => (
            <div
              key={index}
              className="character-square selected-character-square"
              onClick={() => removeCharacter(index)}
            >
              {character && (
                <div className="selected-character-info">
                  <img className="selected-character-image" src={character.image} alt={character.name} />
                  <div className="selected-character-name">{character.name}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="button-container">
        <Link to={'/'}>
          <button className="btn-functions">Return</button>
        </Link>

        <Link to={{ pathname: '/battle' }}>
          <button
            className={`btn-functions ${isBattleButtonDisabled ? 'btn-functions-disabled' : ''}`}
            disabled={isBattleButtonDisabled}
          >
            Battle
          </button>
        </Link>
      </div>

      <div className="character-container">
        <div className="character-row">
          <div className="character-category">
            <h2 className="text-class">Guardians</h2>
            {characters
              .filter((character) => character.charClass === 'guardian')
              .map((character) => (
                <div
                  key={character.id}
                  className={`character-card ${isSelected(character) ? 'selected-character' : ''}`}
                >
                  <img
                    className="img-cards"
                    src={character.image}
                    alt={character.name}
                    onClick={() => handleCharacterClick(character)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="character-row">
          <div className="character-category">
            <h2 className="text-class">Damagers</h2>
            {characters
              .filter((character) => character.charClass === 'damager')
              .map((character) => (
                <div
                  key={character.id}
                  className={`character-card ${isSelected(character) ? 'selected-character' : ''}`}
                >
                  <img
                    className='img-cards'
                    src={character.image}
                    alt={character.name}
                    onClick={() => handleCharacterClick(character)}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="character-row">
          <div className="character-category">
            <h2 className="text-class-sup">Supporters</h2>
            {characters
              .filter((character) => character.charClass === 'support')
              .map((character) => (
                <div
                  key={character.id}
                  className={`character-card ${isSelected(character) ? 'selected-character' : ''}`}
                >
                  <img
                    className='img-cards'
                    src={character.image}
                    alt={character.name}
                    onClick={() => handleCharacterClick(character)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedCharacter && (
        <div className="selected-character-info-container">
          <div className="selected-character-details-name">{selectedCharacter.name2}</div>
          <div className="selected-character-details">
            <img className="selected-character-details-image" src={selectedCharacter.image} alt={selectedCharacter.name} />
            <div className="abilities">
              {Object.keys(selectedCharacter.skills).map((key) => (
                <div key={key} className='abilities-distance'>
                  <strong>{key}: </strong>
                  {selectedCharacter.skills[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
