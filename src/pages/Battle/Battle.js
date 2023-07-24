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
  const charsForHeal = selectedCharacters

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

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedAlly, setSelectedAlly] = useState(null);

  const [distortion, setDistortion] = useState(false);
  const [chaosMark, setChaosMark] = useState(0);
  const [whisperMark, setWhisperMark] = useState(false)

  const [dragonScalesBarrier, setDragonScalesBarrier] = useState(false);
  const [dragonClaws, setDragonClaws] = useState(false);

  const [Lightbringer, setLightbringer] = useState(false)

  const [turnCount, setTurnCount] = useState(1);

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

  const updateTurnCount = () => {
    setTurnCount((prevTurnCount) => prevTurnCount + 1);
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
    let skillName = '';
    const randomProbability = Math.random();

    if (randomProbability < 0.2) {
      skillName = 'Baforada';
    } else if (randomProbability < 0.6) {
      skillName = 'Regenerar';
    } else {
      skillName = 'Arranhar';
    }

    if (dragonScalesBarrier) {
      if (skillName === 'Baforada' || skillName === 'Arranhar') {
        const defenseMessage = `Ares defendeu o time do ataque ${skillName}!`;
        setAttackLog((prevAttackLog) => [...prevAttackLog, defenseMessage]);
        setDragonScalesBarrier(false);
        return;
      } else if (skillName === 'Regenerar') {
        skillName = 'Regenerar';
      }
    }

    const enemy = activeCharacter;
    const aoeDamage = [...guardians, ...support, ...damager];
    let calculatedDamage = 0;

    if (skillName === 'Baforada') {
      calculatedDamage = enemy.attributes.attack + 200;
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

    } else if (skillName === 'Regenerar') {

      const maxRegenAmount = 1500;
      const regenerar = enemyLives[0] + maxRegenAmount;

      setEnemyLives(regenerar);

      const attackMessage = `${enemy.name} usou ${skillName} e se curou em 1500 de vida.`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    } else {
      skillName = 'Arranhar';

      let targetProbability = Math.random();
      if (targetProbability < 0.6) {
        targetCharacter = guardians[0];
      } else if (targetProbability < 0.8) {
        targetCharacter = support[0];
      } else {
        targetCharacter = damager[0];
      }

      calculatedDamage = enemy.attributes.attack + 400 - targetCharacter.attributes.defense;

      const updateLives = [...enemyLives]
      updateLives[0] += calculatedDamage;
      setEnemyLives(updateLives)

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
      const attackMessage = `${enemy.name} usou ${skillName} em ${targetCharacter.name} causou ${calculatedDamage} de dano e se curou em ${calculatedDamage}. `;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    }
  }, [activeCharacter, damager, damagerLives, guardians, guardianLives, enemyLives, support, supportLives, setGuardianLives, setSupportLives, setDamagerLives, dragonScalesBarrier]);

  const dianaSkills = useCallback((activeCharacter, targetCharacter) => {
    if (activeCharacter.name === 'Diana') {
      let skillName;
      let calculatedDamage = 0;

      if (selectedSkill === 'Luz Mágica') {
        skillName = 'Luz Mágica';
        calculatedDamage = activeCharacter.attributes.attack + 300 - targetCharacter.attributes.defense;
        setLightbringer(true)
      } else if (selectedSkill === 'Luz Divina') {
        skillName = 'Luz Divina';
        calculatedDamage = activeCharacter.attributes.attack + 400 - targetCharacter.attributes.defense;
      } else if (selectedSkill === 'Chamado Solar') {
        skillName = 'Chamado Solar'
        calculatedDamage = activeCharacter.attributes.attack + 200 - targetCharacter.attributes.defense;
        const calculatedHeal = activeCharacter.attributes.attack + 400
        const updatedGuardianLives = [...guardianLives];
        updatedGuardianLives[0] += calculatedHeal;
        setGuardianLives(updatedGuardianLives);

        const updatedSupportLives = [...supportLives];
        updatedSupportLives[0] += calculatedHeal;
        setSupportLives(updatedSupportLives);

        const updatedDamagerLives = [...damagerLives];
        updatedDamagerLives[0] += calculatedHeal;
        setDamagerLives(updatedDamagerLives);

        const shieldMessage = `${activeCharacter.name} curou ${calculatedHeal} a todos os aliados`;
        setAttackLog((prevAttackLog) => [...prevAttackLog, shieldMessage]);

      } else if (selectedSkill === 'Aura Restauradora' && selectedAlly !== null) {
        const ally = charsForHeal.find((ent) => ent.id === selectedAlly);
        if (!ally || ally.charClass === 'enemy') {
          return;
        }

        skillName = 'Aura Restauradora';
        const calculatedHealing = activeCharacter.attributes.attack + 350;
        setLightbringer(true)

        if (ally.charClass === 'guardian') {
          const updatedGuardianLives = [...guardianLives];
          updatedGuardianLives[0] += calculatedHealing;
          updatedGuardianLives[0] = Math.min(updatedGuardianLives[0], ally.attributes.life);
          setGuardianLives(updatedGuardianLives);
        } if (ally.charClass === 'support') {
          const updatedSupportLives = [...supportLives];
          updatedSupportLives[0] += calculatedHealing;
          updatedSupportLives[0] = Math.min(updatedSupportLives[0], ally.attributes.life);
          setSupportLives(updatedSupportLives);
        } if (ally.charClass === 'damager') {
          const updatedDamagerLives = [...damagerLives];
          updatedDamagerLives[0] += calculatedHealing;
          updatedDamagerLives[0] = Math.min(updatedDamagerLives[0], ally.attributes.life);
          setDamagerLives(updatedDamagerLives);
        }

        const healMessage = `${activeCharacter.name} usou ${skillName} em ${ally.name} e curou ${calculatedHealing} de vida`;
        setAttackLog((prevAttackLog) => [...prevAttackLog, healMessage]);
        return;
      }

      if (chaosMark) {
        calculatedDamage *= 1.5;
        setChaosMark((prevMarks) => prevMarks - 1)
      }

      if (Lightbringer) {
        calculatedDamage *= 2
        const updatedEnemyLives = [enemyLives];
        updatedEnemyLives[0] -= calculatedDamage;
        setEnemyLives(updatedEnemyLives);
        setLightbringer(false)
      } else {
        const updatedEnemyLives = [enemyLives];
        updatedEnemyLives[0] -= calculatedDamage;
        setEnemyLives(updatedEnemyLives);
      }

      const attackMessage = `${activeCharacter.name} usou ${skillName} em ${targetCharacter.name} e causou ${calculatedDamage} de dano`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    }
  }, [Lightbringer, chaosMark, selectedSkill, selectedAlly, enemyLives, charsForHeal, guardianLives, supportLives, damagerLives]);

  const anneSkills = useCallback((activeCharacter, targetCharacter) => {
    if (activeCharacter.name === 'Anne') {
      let skillName;
      let calculatedDamage = 0;

      if (selectedSkill === 'Caos Aprimorado') {
        skillName = 'Caos Aprimorado';
        calculatedDamage = activeCharacter.attributes.attack + 200 - targetCharacter.attributes.defense;
        setChaosMark(3);
      } else if (selectedSkill === 'Distorção') {
        skillName = 'Distorção';
        calculatedDamage = activeCharacter.attributes.attack + 300 - targetCharacter.attributes.defense;

        if (distortion) {
          calculatedDamage += 800
          setDistortion(false);
        }

      } else if (selectedSkill === 'Domínio Umbral') {
        skillName = 'Domínio Umbral';
        calculatedDamage = activeCharacter.attributes.attack + 200 - targetCharacter.attributes.defense;
        setWhisperMark(true);
      } else {
        skillName = 'Sussurros da Destruição';
        calculatedDamage = activeCharacter.attributes.attack + 500 - targetCharacter.attributes.defense;
        setDistortion(true)
        if (whisperMark) {
          calculatedDamage += 500;
          setWhisperMark(false);
        }
      }

      if (chaosMark) {
        calculatedDamage *= 1.5;
        setChaosMark((prevMarks) => prevMarks - 1);
      }

      const updatedEnemyLives = [enemyLives];
      updatedEnemyLives[0] -= calculatedDamage;
      setEnemyLives(updatedEnemyLives);

      const attackMessage = `${activeCharacter.name} usou ${skillName} em ${targetCharacter.name} e causou ${calculatedDamage} de dano`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    }
  }, [selectedSkill, chaosMark, distortion, enemyLives, whisperMark]);

  const aresSkills = useCallback((activeCharacter, targetCharacter) => {
    if (activeCharacter.name === 'Ares') {
      let skillName
      let calculatedDamage = 0;

      if (selectedSkill === 'Alma Dracônica') {
        skillName = 'Alma Dracônica';
        setDragonScalesBarrier(true);
        setDragonClaws(true)
      } else if (selectedSkill === 'Lâmina Voraz') {
        skillName = 'Lâmina Voraz';
        calculatedDamage = activeCharacter.attributes.attack + 350 - targetCharacter.attributes.defense;

        const updateLives = [...guardianLives];
        updateLives[0] += calculatedDamage;
        setGuardianLives(updateLives)
      } else if (selectedSkill === 'Ira Draconiana') {
        skillName = 'Ira Draconiana';
        calculatedDamage = activeCharacter.attributes.attack + 200 - targetCharacter.attributes.defense;
        setDragonClaws(true)
      } else if (selectedSkill === 'Corte do Dragão') {
        skillName = 'Corte do Dragão';
        calculatedDamage = activeCharacter.attributes.attack + 600 - targetCharacter.attributes.defense;

        if(dragonClaws) {
          calculatedDamage += 200
        }
      }

      if (dragonClaws) {
        calculatedDamage *= 1.5;
        setDragonClaws(false);
      }

      if (chaosMark && calculatedDamage > 0) {
        calculatedDamage *= 1.5;
        setChaosMark((prevMarks) => prevMarks - 1)
      }

      const updatedEnemyLives = [enemyLives];
      updatedEnemyLives[0] -= calculatedDamage;
      setEnemyLives(updatedEnemyLives);

      const attackMessage = `${activeCharacter.name} usou ${skillName} em ${targetCharacter.name} e causou ${calculatedDamage} de dano`;
      setAttackLog((prevAttackLog) => [...prevAttackLog, attackMessage]);
    }
  }, [selectedSkill, enemyLives, chaosMark, guardianLives, dragonClaws])

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
      if (activeCharacter.name === 'Diana') {
        const targetCharacter = enemies[0];
        dianaSkills(activeCharacter, targetCharacter);
        setSelectedSkill(null)
      }
      if (activeCharacter.name === 'Anne') {
        const targetCharacter = enemies[0];
        anneSkills(activeCharacter, targetCharacter);
        setSelectedSkill(null)
      }
      if (activeCharacter.name === 'Ares') {
        const targetCharacter = enemies[0];
        aresSkills(activeCharacter, targetCharacter);
        setSelectedSkill(null)
      }
    }

    updateTurnCount();

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
    showVictoryMessage,
    dianaSkills,
    anneSkills,
    aresSkills
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

      <div className="turn-count">Rodadas: {turnCount}</div>


      <div className="battle-camp">
        <div className="battle-container">
          <div className='back-line'>
            <div className="character-list-battle">
              {support.map((character, index) => (
                <div
                  key={character.id}
                  className={`character-card-battle ${supportLives[index] > character.attributes.life ? 'shield-border' : ''}`}
                >
                  <h2 className="character-name-battle">{character.name}</h2>
                  <img className="character-image-battle" src={character.image} alt={character.name} />
                  <div className="character-info-battle">
                    {supportLives[index] > character.attributes.life ? (
                      <p className="character-life-battle">
                        Escudo: {supportLives[index]} / {character.attributes.life}
                      </p>
                    ) : (
                      <p className="character-life-battle">
                        Vida: {supportLives[index]} / {character.attributes.life}
                      </p>
                    )}
                    {Lightbringer && (
                      <div className='skill'>
                        <span className='dominio-atq'></span>
                        <p>Lightbringer</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="character-list-battle">
              {damager.map((character, index) => (
                <div
                  key={character.id}
                  className={`character-card-battle ${damagerLives[index] > character.attributes.life ? 'shield-border' : ''}`}
                >
                  <h2 className="character-name-battle">{character.name}</h2>
                  <img className="character-image-battle" src={character.image} alt={character.name} />
                  <div className="character-info-battle">
                    {damagerLives[index] > character.attributes.life ? (
                      <p className="character-life-battle">
                        Escudo: {damagerLives[index]} / {character.attributes.life}
                      </p>
                    ) : (
                      <p className="character-life-battle">
                        Vida: {damagerLives[index]} / {character.attributes.life}
                      </p>
                    )}
                  </div>
                  {whisperMark && (
                    <div className='skill'>
                      <span className='dominio'></span>
                      <p>Marca do Sussuro</p>
                    </div>
                  )}
                  {distortion && (
                    <div className='chaos-mark'>
                      <p>Distortion Mark</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="character-list-battle-guardian">
            {guardians.map((character, index) => (
              <div
                key={character.id}
                className={`character-card-battle ${guardianLives[index] > character.attributes.life ? 'shield-border' : ''}`}
              >
                <h2 className="character-name-battle-guardian">{character.name}</h2>
                <img className="character-image-battle-guardian" src={character.image} alt={character.name} />
                <div className="character-info-battle-guardian">
                  {guardianLives[index] > character.attributes.life ? (
                    <p className="character-life-battle">
                      Escudo: {guardianLives[index]} / {character.attributes.life}
                    </p>
                  ) : (
                    <p className="character-life-battle">
                      Vida: {guardianLives[index]} / {character.attributes.life}
                    </p>
                  )}
                </div>
                {dragonScalesBarrier && (
                  <div className='skill'>
                    <span className='dominio-def'></span>
                    <p>Alma Draconiana</p>
                  </div>
                )}
                {dragonClaws && (
                  <div className='skill'>
                    <span className='dominio-atq'></span>
                    <p>Alma Draconiana</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="enemy-list">
          {enemies.map((enemy, index) => (
            <div
              key={enemy.id}
              className={'enemy-card'}
            >
              <h2 className="enemy-name-battle">{enemy.name}</h2>
              <img className="enemy-image-battle" src={enemy.image} alt={enemy.name} />
              <div className="enemy-info-battle">
                {enemyLives[index] <= enemy.attributes.life ? (
                  <p className="enemy-life-battle">
                    Vida: {enemyLives} / {enemy.attributes.life}
                  </p>
                ) : (
                  <p className="enemy-life-battle">
                    Escudo: {enemyLives} / {enemy.attributes.life}
                  </p>
                )}
                {chaosMark && (
                  <div className='chaos-mark'>
                    <p>Chaos Mark</p>
                  </div>
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
                <label>
                  <input
                    type="radio"
                    name="selectedSkill"
                    value={skillName}
                    checked={selectedSkill === skillName}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                  />
                  {skillName}: {activeCharacter.skills[skillName]}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {selectedSkill === 'Aura Restauradora' && (
          <div className="ally-list">
            <h4>Selecione um aliado para curar:</h4>
            <ul>
              {guardians.map((ally) => (
                <li key={ally.id}>
                  <label>
                    <input
                      type="radio"
                      name="selectedAlly"
                      value={ally.id}
                      checked={selectedAlly === ally.id}
                      onChange={() => setSelectedAlly(ally.id)}
                    />
                    {ally.name}
                  </label>
                </li>
              ))}
              {support.map((ally) => (
                <li key={ally.id}>
                  <label>
                    <input
                      type="radio"
                      name="selectedAlly"
                      value={ally.id}
                      checked={selectedAlly === ally.id}
                      onChange={() => setSelectedAlly(ally.id)}
                    />
                    {ally.name}
                  </label>
                </li>
              ))}
              {damager.map((ally) => (
                <li key={ally.id}>
                  <label>
                    <input
                      type="radio"
                      name="selectedAlly"
                      value={ally.id}
                      checked={selectedAlly === ally.id}
                      onChange={() => setSelectedAlly(ally.id)}
                    />
                    {ally.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button className="attack-btn" onClick={handleAttack} disabled={!selectedSkill}>
        Atacar
      </button>

    </>
  );
};

export default Battle;
