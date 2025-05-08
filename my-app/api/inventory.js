// api/inventory.js
// Mock API pour l'inventaire

// Inventaire simulé de l'utilisateur
let userInventory = {
  userId: "1",
  gold: 150,
  items: [
    {
      id: "2",
      name: "Épée longue",
      type: "weapon",
      description: "Une longue épée à deux mains qui inflige de lourds dégâts.",
      stats: { strength: 4 },
      value: 120,
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
      id: "8",
      name: "Amulette de protection",
      type: "accessory",
      description: "Une amulette qui protège son porteur contre les dangers.",
      stats: { strength: 1, agility: 1, intelligence: 1 },
      value: 75,
    },
  ],
};

// Récupérer l'inventaire de l'utilisateur
export const getUserInventory = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  return userInventory;
};

// Vendre un objet
export const sellItem = async (itemId) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Trouver l'objet dans l'inventaire
  const itemIndex = userInventory.items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    throw new Error("Objet non trouvé dans l'inventaire");
  }

  // Récupérer la valeur de l'objet
  const itemValue = userInventory.items[itemIndex].value;

  // Mettre à jour l'or
  userInventory.gold += itemValue;

  // Retirer l'objet de l'inventaire
  userInventory.items.splice(itemIndex, 1);

  return { gold: userInventory.gold };
};
