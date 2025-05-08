// api/items.js
// Mock API pour les objets

// Base de données simulée pour les objets
const items = [
  {
    id: "1",
    name: "Épée en acier",
    type: "weapon",
    description: "Une épée bien équilibrée en acier trempé.",
    stats: { strength: 2 },
    value: 50,
  },
  {
    id: "2",
    name: "Épée longue",
    type: "weapon",
    description: "Une longue épée à deux mains qui inflige de lourds dégâts.",
    stats: { strength: 4 },
    value: 120,
  },
  {
    id: "3",
    name: "Dague d'assassin",
    type: "weapon",
    description:
      "Une dague légère et tranchante, parfaite pour les attaques rapides.",
    stats: { agility: 3 },
    value: 80,
  },
  {
    id: "4",
    name: "Bâton magique",
    type: "weapon",
    description: "Un bâton imprégné de pouvoir magique.",
    stats: { intelligence: 4 },
    value: 100,
  },
  {
    id: "5",
    name: "Armure de cuir",
    type: "armor",
    description: "Une armure légère qui offre une protection de base.",
    stats: { agility: 1 },
    value: 40,
  },
  {
    id: "6",
    name: "Cotte de mailles",
    type: "armor",
    description: "Une armure intermédiaire offrant une bonne protection.",
    stats: { strength: 2 },
    value: 90,
  },
  {
    id: "7",
    name: "Robe de mage",
    type: "armor",
    description: "Une robe enchantée qui amplifie les pouvoirs magiques.",
    stats: { intelligence: 3 },
    value: 85,
  },
  {
    id: "8",
    name: "Amulette de protection",
    type: "accessory",
    description: "Une amulette qui protège son porteur contre les dangers.",
    stats: { strength: 1, agility: 1, intelligence: 1 },
    value: 75,
  },
  {
    id: "9",
    name: "Anneau de puissance",
    type: "accessory",
    description: "Un anneau qui augmente la force de son porteur.",
    stats: { strength: 3 },
    value: 110,
  },
  {
    id: "10",
    name: "Bracelet d'agilité",
    type: "accessory",
    description: "Un bracelet qui améliore la dextérité et la vitesse.",
    stats: { agility: 3 },
    value: 95,
  },
];

// Récupérer tous les objets
export const getItems = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 400));

  return items;
};

// Récupérer un objet spécifique
export const getItem = async (id) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 300));

  const item = items.find((item) => item.id === id);

  if (!item) {
    throw new Error("Objet non trouvé");
  }

  return item;
};
