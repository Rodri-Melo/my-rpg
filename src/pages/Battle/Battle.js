import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Battle.css';
import enemies from '../Characters/Enemies';
import { Link } from 'react-router-dom';

function attackOrder(characters, enemies) {
  const all = [...characters, ...enemies];

  all.sort((a, b) => b.attributes.speed - a.attributes.speed);
  return all;
}

const Battle = () => {
  const selectedCharacters = JSON.parse(localStorage.getItem('selectedCharacters')) || [];
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0); // array de selecionados
  const orderedEntities = [...selectedCharacters, ...enemies]; // ordem de ataque
  const characters = selectedCharacters

  const originalOrderList = attackOrder(characters, enemies); // ordem original para inicio de turno
  const [orderList, setOrderList] = useState(attackOrder(characters, enemies));
  const activeCharacter = orderList[activeCharacterIndex];

  const guardians = orderedEntities.filter((entity) => entity.charClass === 'guardian');
  const support = orderedEntities.filter((entity) => entity.charClass === 'support');
  const damager = orderedEntities.filter((entity) => entity.charClass === 'damager');

  const [guardianLives, setGuardianLives] = useState(guardians.map((guardian) => guardian.attributes.life));
  const [supportLives, setSupportLives] = useState(support.map((support) => support.attributes.life));
  const [damagerLives, setDamagerLives] = useState(damager.map((damager) => damager.attributes.life));
  const [enemyLives, setEnemyLives] = useState(enemies.map((enemy) => enemy.attributes.life));

  const [attackLog, setAttackLog] = useState([]);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [showDefeatMessage, setShowDefeatMessage] = useState(false);
  const [showDeadMessage, setShowDeadMessage] = useState(false);

  const logRef = useRef(null);
  const [enemyTurn, setEnemyTurn] = useState(false);

  useEffect(() => {
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [attackLog]);

  const handleVictory = () => {
    setShowVictoryMessage(true);
  };

  const handleDefeat = () => {
    setShowDefeatMessage(true);
  };

  const handleCharacterDead = useCallback(() => {
    setShowDeadMessage(true);

    setTimeout(() => {
      let updatedOrderList = orderList.slice(1);

      if (updatedOrderList.length === 0) {
        updatedOrderList = [...originalOrderList];
      }

      setOrderList(updatedOrderList);
      setShowDeadMessage(false);
    }, 2000);
  }, [orderList, originalOrderList]);

  const handleEnemyAttack = useCallback((targetCharacter) => {
    const enemy = activeCharacter
    const aoeDamage = [...guardians, ...support, ...damager];
    const randomProbability = Math.random();

    let skillName;
    let calculatedDamage = 0;

    if (randomProbability < 0.2) {
      skillName = 'Baforada';
      calculatedDamage = enemy.attributes.attack + 100;

      aoeDamage.forEach((char) => {
        let damageToChar = calculatedDamage - char.attributes.defense;
        if (damageToChar > 0) {
          if (char.charClass === 'guardian') {
            const updatedGuardianLives = [...guardianLives];
            updatedGuardianLives[0] -= damageToChar;
            setGuardianLives(updatedGuardianLives);
          }
          if (char.charClass === 'support') {
            const updatedSupportLives = [...supportLives];
            updatedSupportLives[0] -= damageToChar;
            setSupportLives(updatedSupportLives);
          }
          if (char.charClass === 'damager') {
            const updatedDamagerLives = [...damagerLives];
            updatedDamagerLives[0] -= damageToChar;
            setDamagerLives(updatedDamagerLives);
          }
          const attackMessage = `${enemy.name} usou ${skillName} em ${char.name} e causou ${damageToChar} de dano.`;
          setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
        }
      });

    } else if (randomProbability < 0.6) {
      skillName = 'Regenerar';
      const regenerar = enemyLives + 1500;

      setEnemyLives(regenerar);

      const attackMessage = `${enemy.name} usou ${skillName} e se curou em 1500 de vida.`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    } else {
      skillName = 'Atacar';

      let targetProbability = Math.random();
      if (targetProbability < 0.6) {
        targetCharacter = guardians[0];
      } else if (targetProbability < 0.8) {
        targetCharacter = support[0];
      } else {
        targetCharacter = damager[0];
      }

      calculatedDamage = enemy.attributes.attack + 150 - targetCharacter.attributes.defense;

      if (targetCharacter.charClass === 'guardian') {
        const updatedGuardianLives = [...guardianLives];
        updatedGuardianLives[0] -= calculatedDamage;
        setGuardianLives(updatedGuardianLives);
      }
      if (targetCharacter.charClass === 'support') {
        const updatedSupportLives = [...supportLives];
        updatedSupportLives[0] -= calculatedDamage;
        setSupportLives(updatedSupportLives);
      }
      if (targetCharacter.charClass === 'damager') {
        const updatedDamagerLives = [...damagerLives];
        updatedDamagerLives[0] -= calculatedDamage;
        setDamagerLives(updatedDamagerLives);
      }
      const attackMessage = `${enemy.name} usou ${skillName} em ${targetCharacter.name} e causou ${calculatedDamage} de dano.`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    }

  }, [activeCharacter, damager, damagerLives, guardians, guardianLives, enemyLives, support, supportLives, setGuardianLives, setSupportLives, setDamagerLives]);


  const handleAttack = useCallback(() => {
    if (showVictoryMessage || showDefeatMessage) {
      return;
    }

    if (enemyLives <= 0) {
      handleVictory();
    }

    const allAlliedCharactersDead = [
      ...guardians.map((character, index) => ({ character, life: guardianLives[index] })),
      ...support.map((character, index) => ({ character, life: supportLives[index] })),
      ...damager.map((character, index) => ({ character, life: damagerLives[index] })),
    ].every(({ life }) => life <= 0);

    if (allAlliedCharactersDead) {
      handleDefeat();
    }

    let activeCharacterLife;

    if (activeCharacter.charClass === 'guardian') {
      activeCharacterLife = guardianLives[0];
    }

    if (activeCharacter.charClass === 'support') {
      activeCharacterLife = supportLives[0];
    }

    if (activeCharacter.charClass === 'damager') {
      activeCharacterLife = damagerLives[0];
    }

    if (activeCharacterLife <= 0) {
      handleCharacterDead();
      return;
    }

    if (activeCharacter.charClass === 'enemy') {
      handleEnemyAttack();
    } else {
      const enemy = enemies[0];
      const damage = activeCharacter.attributes.attack - enemy.attributes.defense;
      if (damage > 0) {
        setEnemyLives((prevEnemyLives) => prevEnemyLives - damage);

        const attackMessage = `${activeCharacter.name} causou ${damage} de dano a ${enemy.name}`;
        setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
      }
    }

    let list = [...orderList];
    list.shift();
    if (list.length === 0) {
      list = [...originalOrderList];
    }

    setOrderList(list);
  }, [
    activeCharacter,
    handleCharacterDead,
    handleEnemyAttack,
    guardians,
    support,
    damager,
    guardianLives,
    supportLives,
    damagerLives,
    orderList,
    originalOrderList,
    enemyLives,
    showDefeatMessage,
    showVictoryMessage
  ]);

  useEffect(() => {
    const updatedActiveCharacterIndex = orderList.findIndex(character => !character.isDead);
    setActiveCharacterIndex(updatedActiveCharacterIndex);
  }, [orderList]);


  useEffect(() => {
    if (activeCharacter.charClass === 'enemy') {
      const timeout = setTimeout(() => {
        const list = [...orderList];
        handleAttack()
        list.shift();
        setOrderList(list);
        setEnemyTurn(true);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [activeCharacter, orderList, handleAttack]);

  useEffect(() => {
    if (activeCharacter.charClass === 'enemy' && !enemyTurn && orderList.length > 0) {
      const timeout = setTimeout(() => {
        setEnemyTurn((prevEnemyTurn) => {
          if (!prevEnemyTurn) {
            handleAttack();
            return true;
          }
          return prevEnemyTurn;
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [activeCharacter, enemyTurn, handleAttack, orderList]);

  return (
    <>
      <div className="attack-order-battle">
        <h2 className="order-title">Ordem de Ataque</h2>
        <ul className="order-battle">
          {orderList.map((entity, index) => (
            <ul key={index}>{entity.name}</ul>
          ))}
        </ul>
      </div>

      <div className="attack-log" ref={logRef}>
        {attackLog.map((message, index) => (
          <p className="attack-message" key={index}>
            {message}
          </p>
        ))}
      </div>

      {showDeadMessage && (
        <div className="dead-message">
          O personagem está morto e não pode atacar!
        </div>
      )}
      {showVictoryMessage && (
        <div className="victory-message">
          Inimigo Derrotado !!
        </div>
      )}
      {showVictoryMessage && (
        <Link to={'/'}>
          <button className="btn-end-battle">Return</button>
        </Link>
      )}
      {showDefeatMessage && (
        <div className="defeat-message">
          Você Perdeu!!
        </div>
      )}
      {showDefeatMessage && (
        <Link to={'/'}>
          <button className="btn-end-battle">Return</button>
        </Link>
      )}

      <div className="battle-camp">
        <div className="battle-container">
          <div className='back-line'>
            <div className="character-list-battle">
              {support.map((character, index) => (
                <div key={character.id} className="character-card-battle">
                  <h2 className="character-name-battle">{character.name}</h2>
                  <img className="character-image-battle" src={character.image} alt={character.name} />
                  <div className="character-info-battle">
                    <p className="character-life-battle">Vida: {supportLives[index]} / {character.attributes.life}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="character-list-battle">
              <div className='damager-div'>
                {damager.map((character, index) => (
                  <div key={character.id} className="character-card-battle">
                    <h2 className="character-name-battle">{character.name}</h2>
                    <img className="character-image-battle" src={character.image} alt={character.name} />
                    <div className="character-info-battle">
                      <p className="character-life-battle">Vida: {damagerLives[index]} / {character.attributes.life}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="character-list-battle-guardian">
            {guardians.map((character, index) => (
              <div key={character.id} className="character-card-battle-guardian">
                <h2 className="character-name-battle-guardian">{character.name}</h2>
                <img className="character-image-battle-guardian" src={character.image} alt={character.name} />
                <div className="character-info-battle-guardian">
                  <p className="character-life-battle">Vida: {guardianLives[index]} / {character.attributes.life}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="enemy-list">
          {enemies.map((enemy) => (
            <div key={enemy.id} className="enemy-card">
              <h2 className="enemy-name-battle">{enemy.name}</h2>
              <img className="enemy-image-battle" src={enemy.image} alt={enemy.name} />
              <div className="enemy-info-battle">
                {enemyLives > enemy.attributes.life ? (
                  <div className="shielded-enemy">
                    <p className="enemy-life-battle">Escudo: {enemyLives} / {enemy.attributes.life}</p>
                  </div>
                ) : (
                  <p className="enemy-life-battle">Vida: {enemyLives} / {enemy.attributes.life}</p>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
      <div className="active-character-skills">
        <div className="top">
          <h3 className="active-name">Habilidades de {activeCharacter.name}</h3>
          <ul>
            {Object.keys(activeCharacter.skills).map((skillName) => (
              <li className="active-abilities" key={skillName}>
                <strong>{skillName}:</strong> {activeCharacter.skills[skillName]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="attack-btn" onClick={handleAttack}>
        Atacar
      </button>
    </>
  );
};

export default Battle;
