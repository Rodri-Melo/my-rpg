const characters = [
  {
    id: 1,
    name: 'Diana',
    name2: 'Diana Lightbringer',
    charClass: 'support',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/diana/diana9.png'),
    image2: require('../../images/new-chars/diana/diana6.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/ares/ares7.png'),
    image2: require('../../images/new-chars/ares/ares13.png'),
    skills: {
      'Alma Dracônica': 'Cria duas marcas, DEF e ATQ',
      'Lâmina Voraz': 'Causa 350 + ATQ de dano e se cura com o dano causado',
      'Ira Draconiana': 'causa 200 + ATQ de dano AOE e cria marca de ATQ ',
      'Corte do Dragão': 'Causa 600 + ATQ de dano, Consumir marca de ATQ causa 200 de dano extra',
    },
    attributes: {
      life: 2400,
      attack: 150,
      defense: 200,
      speed: 115,
    }
  },
  {
    id: 3,
    name: 'Anne',
    name2: 'Anne Blackheart',
    charClass: 'damager',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/anne/anne4.png'),
    image2: require('../../images/new-chars/anne/anne2.png'),
    skills: {
      'Caos Aprimorado': 'Causa 200 + ATQ em area e cria 3 marcas que aumenta o dano sofrido no inimigo',
      'Distorção': 'Causa 300 + ATQ de dano, consumir marca da Distorção causa 800 dano extra',
      'Domínio Umbral': 'Causa 200 + ATQ de dano em area e cria marca do Sussuro',
      'Sussuros da Destruição': 'Causa 500 + ATQ de dano em area e cria marca Distorção, consumir marca do Sussuro causa 500 dano Extra em area,',
    },
    attributes: {
      life: 1400,
      attack: 200,
      defense: 90,
      speed: 90,
    }
  },
  {
    id: 4,
    name: 'Sophia',
    name2: 'Sophia Stormrage',
    charClass: 'damager',
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/sophia/sophia9.png'),
    image2: require('../../images/new-chars/sophia/sophia2.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/magnus/magnus1.png'),
    image2: require('../../images/new-chars/magnus/magnus4.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/crystal/crystal6.png'),
    image2: require('../../images/new-chars/crystal/crystal4.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/charlotte/charlotte4.png'),
    image2: require('../../images/new-chars/charlotte/charlotte6.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/arthur/arthur5.png'),
    image2: require('../../images/new-chars/arthur/arthur1.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/dante/dante5.png'),
    image2: require('../../images/new-chars/dante/dante2.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/nova/nova1.png'),
    image2: require('../../images/new-chars/nova/nova11.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
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
    description: 'dlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/mortis/mortis6.png'),
    image2: require('../../images/new-chars/mortis/mortis2.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
    },
    attributes: {
      life: 1400,
      attack: 115,
      defense: 80,
      speed: 110,
    }
  },
  {
    id: 12,
    name: 'Connor',
    name2: 'Connor',
    charClass: 'support',
    description: 'dlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    image: require('../../images/new-chars/connor/connor4.png'),
    image2: require('../../images/new-chars/connor/connor3.png'),
    skills: {
      'Luz Mágica': 'Causa 300 + ATQ de dano e cria uma marca de ATQ',
      'Aura Restauradora': 'Cura 350 + ATQ de vida e cria uma marca de ATQ',
      'Luz Divina': 'Causa 400 + ATQ de dano em area',
      'Chamado Solar': 'Cura 400 + ATQ de todos os aliados (Cura extra se torna Escudo) e causa 200 de dano + ATQ de dano em area',
    },
    attributes: {
      life: 1500,
      attack: 100,
      defense: 100,
      speed: 85,
    }
  },
];

export default characters;

