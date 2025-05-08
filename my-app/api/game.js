// api/game.js
// Mock API pour le jeu

// Lancer une partie
export const playGame = async (characterId) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Générer un plateau de jeu aléatoire
  const boardLength = 10; // Nombre de cases sur le plateau
  const board = [];

  for (let i = 0; i < boardLength; i++) {
    // Différents types d'événements
    const eventTypes = ["combat", "treasure", "piège", "rencontre", "repos"];

    // Créer un événement aléatoire
    let eventType;

    if (i === 0) {
      // La première case est toujours un départ
      eventType = "départ";
    } else if (i === boardLength - 1) {
      // La dernière case est toujours une arrivée
      eventType = "arrivée";
    } else {
      // Choisir un type d'événement aléatoire
      eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    }

    // Créer l'événement
    const event = {
      type: eventType,
      title: getEventTitle(eventType),
      description: getEventDescription(eventType),
      choices: getEventChoices(eventType),
    };

    board.push(event);
  }

  return {
    characterId,
    board,
  };
};

// Récupérer les récompenses de fin de partie
export const getRewards = async (characterId, result) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Générer des récompenses aléatoires
  let rewards = {
    experience: Math.floor(Math.random() * 50) + 50, // 50-100 XP
    gold: Math.floor(Math.random() * 30) + 20, // 20-50 or
  };

  // Chance de trouver un objet (50%)
  if (Math.random() > 0.5) {
    // Obtenir tous les objets
    const allItems = await getItems();

    // Sélectionner un objet aléatoire
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)];

    rewards.items = [randomItem];
  } else {
    rewards.items = [];
  }

  return rewards;
};

// Fonctions utilitaires pour générer des événements
function getEventTitle(type) {
  const titles = {
    départ: "Début de l'aventure",
    arrivée: "Fin de l'aventure",
    combat: "Une créature hostile apparaît!",
    treasure: "Un coffre mystérieux",
    piège: "Un piège dangereux",
    rencontre: "Une rencontre inattendue",
    repos: "Un lieu de repos",
  };

  return titles[type] || "Événement mystérieux";
}

function getEventDescription(type) {
  const descriptions = {
    départ: "Vous commencez votre aventure dans ce donjon mystérieux.",
    arrivée: "Vous avez atteint la fin du donjon!",
    combat: "Une créature menaçante se dresse devant vous, prête à attaquer!",
    treasure:
      "Vous trouvez un coffre fermé. Il pourrait contenir des trésors... ou un piège.",
    piège: "Le sol s'effondre sous vos pieds! Vous devez réagir vite!",
    rencontre:
      "Vous croisez un étrange personnage qui semble vouloir vous parler.",
    repos:
      "Vous trouvez un endroit calme où vous pouvez vous reposer et récupérer.",
  };

  return descriptions[type] || "Quelque chose d'étrange se produit...";
}

function getEventChoices(type) {
  const choices = {
    départ: [
      {
        text: "Avancer prudemment",
        stat: "agility",
        successMessage:
          "Vous avancez avec précaution, repérant les dangers potentiels.",
        failureMessage: "Malgré votre prudence, vous faites trop de bruit.",
        rewards: { experience: 10 },
      },
    ],
    arrivée: [
      {
        text: "Célébrer votre victoire",
        stat: "strength",
        successMessage: "Vous levez votre arme en signe de victoire!",
        failureMessage:
          "Votre célébration est un peu maladroite, mais vous avez quand même réussi!",
        rewards: { experience: 20, gold: 10 },
      },
    ],
    combat: [
      {
        text: "Attaquer directement",
        stat: "strength",
        successMessage: "Votre attaque puissante terrasse l'ennemi!",
        failureMessage:
          "Votre attaque manque de puissance et la créature contre-attaque!",
        rewards: { experience: 30, gold: 15 },
      },
      {
        text: "Esquiver et frapper",
        stat: "agility",
        successMessage:
          "Vous esquivez agilement et trouvez une ouverture pour frapper!",
        failureMessage:
          "Vous n'êtes pas assez rapide et la créature vous touche!",
        rewards: { experience: 25, gold: 10 },
      },
    ],
    treasure: [
      {
        text: "Ouvrir le coffre",
        stat: "strength",
        successMessage: "Vous forcez le coffre et découvrez un trésor!",
        failureMessage:
          "Le mécanisme est coincé et vous vous blessez en essayant de l'ouvrir.",
        rewards: { gold: 30 },
      },
      {
        text: "Examiner le mécanisme",
        stat: "intelligence",
        successMessage:
          "Vous comprenez le mécanisme et ouvrez le coffre sans déclencher de piège!",
        failureMessage:
          "Le mécanisme est trop complexe et vous déclenchez un piège!",
        rewards: { gold: 40 },
      },
    ],
    piège: [
      {
        text: "Sauter rapidement",
        stat: "agility",
        successMessage: "Vous sautez juste à temps et évitez le piège!",
        failureMessage: "Vous n'êtes pas assez rapide et tombez dans le piège!",
        rewards: { experience: 20 },
      },
      {
        text: "Analyser la situation",
        stat: "intelligence",
        successMessage: "Vous repérez un moyen sûr de passer!",
        failureMessage:
          "Vous n'identifiez pas correctement le danger et tombez dans le piège!",
        rewards: { experience: 15 },
      },
    ],
    rencontre: [
      {
        text: "Engager la conversation",
        stat: "intelligence",
        successMessage:
          "Vous avez une conversation enrichissante et obtenez des informations utiles!",
        failureMessage:
          "Vous dites quelque chose qui offense votre interlocuteur.",
        rewards: { experience: 15, gold: 5 },
      },
      {
        text: "Montrer votre force",
        stat: "strength",
        successMessage:
          "Votre démonstration de force impressionne votre interlocuteur!",
        failureMessage:
          "Votre interlocuteur n'est pas impressionné par votre attitude.",
        rewards: { experience: 10 },
      },
    ],
    repos: [
      {
        text: "Se reposer",
        stat: "strength",
        successMessage: "Vous vous reposez et récupérez vos forces!",
        failureMessage: "Votre repos est perturbé par un bruit inquiétant.",
        rewards: { experience: 10 },
      },
      {
        text: "Monter la garde",
        stat: "intelligence",
        successMessage:
          "Vous restez vigilant et assurez la sécurité du groupe!",
        failureMessage: "Vous vous endormez pendant votre tour de garde.",
        rewards: { experience: 5 },
      },
    ],
  };

  return (
    choices[type] || [
      {
        text: "Improviser",
        stat: "agility",
        successMessage: "Vous vous adaptez rapidement à la situation!",
        failureMessage: "Votre improvisation ne fonctionne pas comme prévu.",
        rewards: { experience: 5 },
      },
    ]
  );
}
