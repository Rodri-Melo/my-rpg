const charactersSkills = [
  {
    name: 'Diana',
    skills: {
      skill1: {
        name: 'Atacar',
        description: 'Causa 100 de dano',
        function: (user, target) => {
          const damage = 100 + user.attributes.attack - target.attributes.defense;
        },
      },
      skill2: {
        name: 'Cura',
        description: 'Cura 350 de vida',
      },
    },
  },
  {
    name: 'Ares',
    skills: {
      skill1: {
        name: 'Atacar',
        description: 'Causa 120 de dano',
      },
      skill2: {
        name: 'Alma do Dragão',
        description: 'Cria Escudo de 600 de vida',
      },
    },
  },
  {
    name: 'Anne',
    skills: {
      skill1: {
        name: 'Atacar',
        description: 'Causa 90 de dano',
      },
      skill2: {
        name: 'Enfraquecer',
        description: 'Causa 150 de dano e diminui DEF',
      },
    },
  },
];

export default charactersSkills; 
