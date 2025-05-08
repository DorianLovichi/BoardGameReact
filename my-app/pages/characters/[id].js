// pages/characters/[id].js
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import { getCharacter, levelUpCharacter } from "../../api/characters";
import { getItems } from "../../api/items";
import CharacterDetails from "../../components/CharacterDetails";
import EquipmentSection from "../../components/EquipmentSection";
import styles from "../../styles/CharacterDetail.module.css";

export default function CharacterDetail() {
  const [character, setCharacter] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!id) return;

    const fetchData = async () => {
      try {
        const charData = await getCharacter(id);
        setCharacter(charData);

        const itemsData = await getItems();
        setAvailableItems(itemsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setError("Erreur lors du chargement du personnage");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated, router]);

  const handleLevelUp = async () => {
    try {
      const updatedCharacter = await levelUpCharacter(id);
      setCharacter(updatedCharacter);
    } catch (error) {
      setError("Erreur lors de la montée de niveau");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!character) {
    return <div className={styles.error}>Personnage non trouvé</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{character.name}</h1>

      <div className={styles.characterSheet}>
        <CharacterDetails character={character} onLevelUp={handleLevelUp} />

        <EquipmentSection
          character={character}
          availableItems={availableItems}
          setCharacter={setCharacter}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.button} onClick={() => router.push("/game")}>
          Partir à l'aventure
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/characters")}
        >
          Retour à la liste des personnages
        </button>
      </div>
    </div>
  );
}
