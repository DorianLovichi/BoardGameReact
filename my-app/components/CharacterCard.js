// components/CharacterCard.js
import styles from "../styles/CharacterCard.module.css";

export default function CharacterCard({ character, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h2 className={styles.name}>{character.name}</h2>
      <div className={styles.details}>
        <p className={styles.class}>
          Classe: <span>{character.class}</span>
        </p>
        <p className={styles.level}>
          Niveau: <span>{character.level}</span>
        </p>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statName}>FOR</span>
          <span className={styles.statValue}>{character.stats.strength}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statName}>AGI</span>
          <span className={styles.statValue}>{character.stats.agility}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statName}>INT</span>
          <span className={styles.statValue}>
            {character.stats.intelligence}
          </span>
        </div>
      </div>
      <div className={styles.equipmentPreview}>
        <p>
          Arme:{" "}
          {character.equipment.weapon
            ? character.equipment.weapon.name
            : "Aucune"}
        </p>
        <p>
          Armure:{" "}
          {character.equipment.armor
            ? character.equipment.armor.name
            : "Aucune"}
        </p>
      </div>
    </div>
  );
}
