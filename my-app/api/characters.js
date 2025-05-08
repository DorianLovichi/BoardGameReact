// api/characters.js
// Mock API pour les personnages

// Base de données simulée pour les personnages
let characters = [
  {
    id: "1",
    userId: "1",
    name: "Eldric",
    class: "Guerrier",
    level: 3,
    experience: 250,
    stats: {
      strength: 12,
      agility: 8,
      intelligence: 5,
    },
    equipment: {
      weapon: {
        id: "1",
        name: "Épée en acier",
        type: "weapon",
        description: "Une épée bien équilibrée en acier trempé.",
        stats: { strength: 2 },
        value: 50,
      },
      armor: null,
      accessory: null,
    },
    inventory: [],
  },
];

// Récupérer tous les personnages de l'utilisateur
export const getCharacters = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Filtrer les personnages par utilisateur (dans une vraie API)
  const userCharacters = characters.filter((char) => char.userId === "1");

  return userCharacters;
};

// Récupérer un personnage spécifique
export const getCharacter = async (id) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 400));

  const character = characters.find((char) => char.id === id);

  if (!character) {
    throw new Error("Personnage non trouvé");
  }

  return character;
};

// Créer un nouveau personnage
export const createCharacter = async (characterData) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 600));

  const newCharacter = {
    id: String(characters.length + 1),
    userId: "1", // Dans une vraie API, ce serait l'ID de l'utilisateur connecté
    ...characterData,
  };

  characters.push(newCharacter);

  return newCharacter;
};

// Augmenter le niveau d'un personnage
export const levelUpCharacter = async (id) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  const characterIndex = characters.findIndex((char) => char.id === id);

  if (characterIndex === -1) {
    throw new Error("Personnage non trouvé");
  }

  const character = characters[characterIndex];

  // Vérifier si le personnage a assez d'expérience pour monter de niveau
  const expNeeded = character.level * 100;
  if (character.experience < expNeeded) {
    throw new Error("Pas assez d'expérience pour monter de niveau");
  }

  // Mettre à jour le personnage
  const updatedCharacter = {
    ...character,
    level: character.level + 1,
    experience: character.experience - expNeeded,
    stats: {
      strength: character.stats.strength + 1,
      agility: character.stats.agility + 1,
      intelligence: character.stats.intelligence + 1,
    },
  };

  // Sauvegarder les modifications
  characters[characterIndex] = updatedCharacter;

  return updatedCharacter;
};

// Équiper un objet à un personnage
export const equipItem = async (characterId, slot, itemId) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  const characterIndex = characters.findIndex(
    (char) => char.id === characterId
  );

  if (characterIndex === -1) {
    throw new Error("Personnage non trouvé");
  }

  const character = { ...characters[characterIndex] };

  // Si itemId est null, on retire l'équipement
  if (itemId === null) {
    character.equipment[slot] = null;

    // Mettre à jour le personnage
    characters[characterIndex] = character;

    return character;
  }

  // Chercher l'objet dans l'inventaire (dans une vraie app)
  // Ici on simule avec des objets prédéfinis
  const items = await getItems();
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    throw new Error("Objet non trouvé");
  }

  // Équiper l'objet
  character.equipment[slot] = item;

  // Mettre à jour le personnage
  characters[characterIndex] = character;

  return character;
};
