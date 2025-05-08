// components/CharacterSelect.js
import styles from "../styles/CharacterSelect.module.css";

export default function CharacterSelect({
  characters,
  selectedCharacter,
  onSelect,
  onStart,
}) {
  if (characters.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        <p>
          Vous n'avez pas encore de personnage. Créez-en un pour commencer à
          jouer!
        </p>
        <button
          className={styles.createButton}
          onClick={() => router.push("/characters/create")}
        >
          Créer un personnage
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sélectionnez votre personnage</h2>

      <div className={styles.charactersList}>
        {characters.map((character) => (
          <div
            key={character.id}
            className={`${styles.characterCard} ${
              selectedCharacter?.id === character.id ? styles.selected : ""
            }`}
            onClick={() => onSelect(character)}
          >
            <h3 className={styles.name}>{character.name}</h3>
            <p className={styles.classLevel}>
              {character.class} • Niveau {character.level}
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statName}>FOR</span>
                <span className={styles.statValue}>
                  {character.stats.strength}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>AGI</span>
                <span className={styles.statValue}>
                  {character.stats.agility}
                </span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statName}>INT</span>
                <span className={styles.statValue}>
                  {character.stats.intelligence}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.startButton}
          disabled={!selectedCharacter}
          onClick={onStart}
        >
          Commencer l'aventure
        </button>
      </div>
    </div>
  );
}
