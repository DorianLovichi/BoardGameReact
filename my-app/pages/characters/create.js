// pages/characters/create.js
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import { createCharacter } from "../../api/characters";
import styles from "../../styles/CharacterForm.module.css";

const CLASSES = [
  {
    id: "warrior",
    name: "Guerrier",
    stats: { strength: 10, agility: 6, intelligence: 4 },
  },
  {
    id: "mage",
    name: "Mage",
    stats: { strength: 3, agility: 5, intelligence: 12 },
  },
  {
    id: "rogue",
    name: "Voleur",
    stats: { strength: 5, agility: 12, intelligence: 7 },
  },
  {
    id: "archer",
    name: "Archer",
    stats: { strength: 6, agility: 10, intelligence: 6 },
  },
];

export default function CreateCharacter() {
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Veuillez saisir un nom pour votre personnage");
      return;
    }

    if (!selectedClass) {
      setError("Veuillez sélectionner une classe");
      return;
    }

    try {
      const characterData = {
        name,
        class: selectedClass,
        level: 1,
        experience: 0,
        stats: CLASSES.find((c) => c.id === selectedClass).stats,
        equipment: {
          weapon: null,
          armor: null,
          accessory: null,
        },
        inventory: [],
      };

      await createCharacter(characterData);
      router.push("/characters");
    } catch (error) {
      setError("Erreur lors de la création du personnage");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un Personnage</h1>
      {error && <p className={styles.error}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nom du personnage</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Classe</label>
          <div className={styles.classSelector}>
            {CLASSES.map((classOption) => (
              <div
                key={classOption.id}
                className={`${styles.classCard} ${
                  selectedClass === classOption.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedClass(classOption.id)}
              >
                <h3>{classOption.name}</h3>
                <div className={styles.stats}>
                  <p>Force: {classOption.stats.strength}</p>
                  <p>Agilité: {classOption.stats.agility}</p>
                  <p>Intelligence: {classOption.stats.intelligence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Créer le personnage
        </button>
      </form>
    </div>
  );
}
