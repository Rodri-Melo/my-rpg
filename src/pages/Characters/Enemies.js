const enemies = [
  {
    id: 1,
    name: 'Dragon',
    charClass: 'enemy',
    image: require('../../images/old/enemies-back3.jpg'),
    skills: {
      'Atacar': 'Causa 150 de dano a um alvo',
      'Baforada': 'Causa 100 de dano a todos os alvos'
    },
    attributes: {
      life: 5000,
      attack: 300,
      defense: 90,
      speed: 100,
    }
  },
];

export default enemies;