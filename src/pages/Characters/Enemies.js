const enemies = [
  {
    id: 1,
    name: 'Troll',
    charClass: 'enemy',
    image: require('../../images/new-chars/enemies/enemie1.png'),
    skills: {
      'Atacar': 'causa ATK + 150 de dano',
      'Baforada': 'causa ATK + 100 de dano AOE',
      'Regenerar' : 'Regenera 1500 de vida'
    },
    attributes: {
      life: 5000,
      attack: 300,
      defense: 120,
      speed: 100,
    },
  },
];

export default enemies;