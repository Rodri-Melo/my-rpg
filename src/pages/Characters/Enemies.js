const enemies = [
  {
    id: 1,
    name: 'Troll',
    charClass: 'enemy',
    image: require('../../images/new-chars/enemies/enemie1.png'),
    skills: {
      'Arranhar': 'causa ATK + 400 de dano',
      'Baforada': 'causa ATK + 200 de dano AOE',
      'Regenerar' : 'Regenera 1500 de vida'
    },
    attributes: {
      life: 12000,
      attack: 500,
      defense: 150,
      speed: 100,
    },
  },
];

export default enemies;