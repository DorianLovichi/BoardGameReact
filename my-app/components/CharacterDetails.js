// components/CharacterDetails.js
import styles from "../styles/CharacterDetails.module.css";

export default function CharacterDetails({ character, onLevelUp }) {
  // Calcul de l'expérience nécessaire pour le prochain niveau
  const expForNextLevel = character.level * 100;
  const expPercentage = (character.experience / expForNextLevel) * 100;

  // Déterminer si le personnage peut monter de niveau
  const canLevelUp = character.experience >= expForNextLevel;

  return (
    <div className={styles.characterDetails}>
      <div className={styles.header}>
        <h2>{character.name}</h2>
        <p className={styles.class}>{character.class}</p>
      </div>

      <div className={styles.levelSection}>
        <div className={styles.levelInfo}>
          <span className={styles.level}>Niveau {character.level}</span>
          <div className={styles.expBar}>
            <div
              className={styles.expFill}
              style={{ width: `${expPercentage}%` }}
            ></div>
          </div>
          <span className={styles.expText}>
            {character.experience} / {expForNextLevel} XP
          </span>
        </div>

        {canLevelUp && (
          <button className={styles.levelUpButton} onClick={onLevelUp}>
            Monter de niveau
          </button>
        )}
      </div>

      <div className={styles.stats}>
        <h3>Statistiques</h3>
        <div className={styles.statsList}>
          <div className={styles.statItem}>
            <span className={styles.statName}>Force</span>
            <span className={styles.statValue}>{character.stats.strength}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statName}>Agilité</span>
            <span className={styles.statValue}>{character.stats.agility}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statName}>Intelligence</span>
            <span className={styles.statValue}>
              {character.stats.intelligence}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
