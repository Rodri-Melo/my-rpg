const characters = [
  {
    id: 1,
    name: 'Diana',
    name2: 'Diana Lightbringer',
    charClass: 'support',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/diana/diana9.png'),
    image2: require('../../images/new-chars/diana/diana6.png'),
    skills: {
      'Atacar': 'Causa 100 de dano',
      'Cura': 'Cura 350 de vida',
      'Luz Divina': 'Causa 350 de dano AOE',
      'Chamado Solar': 'Cria Escudo 300 AOE e causa 300 de dano AOE',
    },
    attributes: {
      life: 1500,
      attack: 130,
      defense: 100,
      speed: 85,
    }
  },
  {
    id: 2,
    name: 'Ares',
    name2: 'Ares Dawnbringer',
    charClass: 'guardian',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/ares/ares10.png'),
    image2: require('../../images/new-chars/ares/ares13.png'),
    skills: {
      'Atacar': 'Causa 120 de dano',
      'Alma do Dragão': 'Cria Escudo de 600 de vida',
      'Corte do Dragão': 'Causa 300 de dano',
      'Fúria Dracônica': 'Invunerável por 1 turno e ataca 5 vezes causando 150 de dano ',
    },
    attributes: {
      life: 2800,
      attack: 170,
      defense: 150,
      speed: 100,
    }
  },
  {
    id: 3,
    name: 'Anne',
    name2: 'Anne Blackheart',
    charClass: 'damager',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/anne/anne4.png'),
    image2: require('../../images/new-chars/anne/anne2.png'),
    skills: {
      'Atacar': 'Causa 90 de dano',
      'Enfraquecer': 'Causa 150 de dano e diminui DEF',
      'Magia Negra': 'Causa 250 de dano AOE',
      'Distorção': 'Causa 500 de dano AOE',
    },
    attributes: {
      life: 1400,
      attack: 180,
      defense: 100,
      speed: 90,
    }
  },
  {
    id: 4,
    name: 'Sophia',
    name2: 'Sophia Stormrage',
    charClass: 'damager',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/sophia/sophia2.png'),
    image2: require('../../images/new-chars/sophia/sophia9.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 900,
      attack: 200,
      defense: 80,
      speed: 130,
    }
  },
  {
    id: 5,
    name: 'Magnus',
    name2: 'Magnus Nightfall',
    charClass: 'support',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/magnus/magnus1.png'),
    image2: require('../../images/new-chars/magnus/magnus4.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1000,
      attack: 95,
      defense: 75,
      speed: 108,
    }
  },
  {
    id: 6,
    name: 'Crystal',
    name2: 'Crystal frostwind',
    charClass: 'guardian',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/crystal/crystal7.png'),
    image2: require('../../images/new-chars/crystal/crystal4.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1500,
      attack: 120,
      defense: 80,
      speed: 60,
    }
  },
  {
    id: 7,
    name: 'Charlotte',
    name2: 'Charlotte',
    charClass: 'support',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/charlotte/charlotte4.png'),
    image2: require('../../images/new-chars/charlotte/charlotte6.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1300,
      attack: 95,
      defense: 90,
      speed: 90,
    }
  },
  {
    id: 8,
    name: 'Arthur',
    name2: 'Arthur Goldenleaf',
    charClass: 'damager',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptionm area',
    image: require('../../images/new-chars/arthur/arthur5.png'),
    image2: require('../../images/new-chars/arthur/arthur1.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1100,
      attack: 140,
      defense: 60,
      speed: 115,
    }
  }, 
  {
    id: 9,
    name: 'Dante',
    name2: 'Dante',
    charClass: 'guardian',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/dante/dante5.png'),
    image2: require('../../images/new-chars/dante/dante2.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1500,
      attack: 120,
      defense: 80,
      speed: 60,
    }
  },
  {
    id: 10,
    name: 'Nova',
    name2: 'Nova',
    charClass: 'guardian',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/nova/nova1.png'),
    image2: require('../../images/new-chars/nova/nova11.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1500,
      attack: 120,
      defense: 80,
      speed: 110,
    }
  },
  {
    id: 11,
    name: 'Mortis',
    name2: 'Mortis',
    charClass: 'damager',
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    image: require('../../images/new-chars/mortis/mortis6.png'),
    image2: require('../../images/new-chars/mortis/mortis2.png'),
    skills: {
      'Atacar': 'Causa 90 de dano e aumenta 30% de DEF',
      'Alma': 'Causa 150 de dano e cria 25% da vida de escudo',
      'Corte do Dragão': 'Destrói um alvo causando 250 de dano',
      'Furia': 'Aumenta Ataque e Defesa em 40% por 5 turnos',
    },
    attributes: {
      life: 1400,
      attack: 115,
      defense: 80,
      speed: 110,
    }
  },
];

export default characters;

