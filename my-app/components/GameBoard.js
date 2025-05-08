// components/GameBoard.js
import { useState, useEffect } from "react";
import styles from "../styles/GameBoard.module.css";

export default function GameBoard({ gameData, character, onComplete }) {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventResult, setEventResult] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [diceRoll, setDiceRoll] = useState(null);
  const [rolling, setRolling] = useState(false);

  const handleRollDice = () => {
    setRolling(true);

    // Animation du lancer de dé
    const rollInterval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Arrêt de l'animation après 1 seconde
    setTimeout(() => {
      clearInterval(rollInterval);
      setRolling(false);

      // Déterminer le résultat final du dé
      const finalRoll = Math.floor(Math.random() * 6) + 1;
      setDiceRoll(finalRoll);

      // Déplacer le joueur
      const newPosition = Math.min(
        playerPosition + finalRoll,
        gameData.board.length - 1
      );
      setPlayerPosition(newPosition);

      // Vérifier si le joueur a terminé le plateau
      if (newPosition === gameData.board.length - 1) {
        setGameComplete(true);
        onComplete("success");
        return;
      }

      // Déclencher l'événement de la case
      setCurrentEvent(gameData.board[newPosition]);
    }, 1000);
  };

  const handleEventChoice = (choice) => {
    // Simuler le résultat de l'événement basé sur le choix et les stats du personnage
    const success = Math.random() < 0.5 + character.stats[choice.stat] / 100;

    setEventResult({
      success,
      message: success ? choice.successMessage : choice.failureMessage,
      rewards: success ? choice.rewards : null,
    });
  };

  const handleContinue = () => {
    setCurrentEvent(null);
    setEventResult(null);

    // Vérifier si le joueur a terminé le plateau
    if (playerPosition === gameData.board.length - 1) {
      setGameComplete(true);
      onComplete("success");
    }
  };

  return (
    <div className={styles.gameBoard}>
      <div className={styles.boardContainer}>
        <div className={styles.board}>
          {gameData.board.map((tile, index) => (
            <div
              key={index}
              className={`
                ${styles.tile} 
                ${index === playerPosition ? styles.playerPosition : ""}
                ${index < playerPosition ? styles.visited : ""}
              `}
            >
              <span className={styles.tileIndex}>{index + 1}</span>
              <span className={styles.tileType}>{tile.type}</span>
            </div>
          ))}
        </div>

        <div className={styles.playerInfo}>
          <h3>{character.name}</h3>
          <p>
            Niveau {character.level} • {character.class}
          </p>
        </div>
      </div>

      {!currentEvent && !gameComplete && (
        <div className={styles.diceSection}>
          <button
            className={`${styles.diceButton} ${rolling ? styles.rolling : ""}`}
            onClick={handleRollDice}
            disabled={rolling}
          >
            {diceRoll ? `${diceRoll}` : "Lancer le dé"}
          </button>
        </div>
      )}

      {currentEvent && !eventResult && (
        <div className={styles.eventCard}>
          <h3 className={styles.eventTitle}>{currentEvent.title}</h3>
          <p className={styles.eventDescription}>{currentEvent.description}</p>

          <div className={styles.eventChoices}>
            {currentEvent.choices.map((choice, index) => (
              <button
                key={index}
                className={styles.choiceButton}
                onClick={() => handleEventChoice(choice)}
              >
                {choice.text} ({choice.stat.substring(0, 3).toUpperCase()})
              </button>
            ))}
          </div>
        </div>
      )}

      {eventResult && (
        <div
          className={`${styles.eventResult} ${
            eventResult.success ? styles.success : styles.failure
          }`}
        >
          <h3>{eventResult.success ? "Succès!" : "Échec!"}</h3>
          <p>{eventResult.message}</p>

          {eventResult.rewards && (
            <div className={styles.rewards}>
              <h4>Récompenses:</h4>
              {eventResult.rewards.experience && (
                <p>+{eventResult.rewards.experience} XP</p>
              )}
              {eventResult.rewards.gold && (
                <p>+{eventResult.rewards.gold} or</p>
              )}
            </div>
          )}

          <button className={styles.continueButton} onClick={handleContinue}>
            Continuer
          </button>
        </div>
      )}

      {gameComplete && (
        <div className={styles.gameComplete}>
          <h3>Aventure terminée!</h3>
          <p>Vous avez atteint la fin du plateau.</p>
        </div>
      )}
    </div>
  );
}
