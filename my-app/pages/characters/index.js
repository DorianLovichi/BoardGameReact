// pages/characters/index.js
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import { getCharacters } from "../../api/characters";
import CharacterCard from "../../components/CharacterCard";
import styles from "../../styles/Characters.module.css";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchCharacters = async () => {
      try {
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des personnages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [isAuthenticated, router]);

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mes Personnages</h1>

      <button
        className={styles.createButton}
        onClick={() => router.push("/characters/create")}
      >
        Créer un nouveau personnage
      </button>

      {characters.length === 0 ? (
        <p className={styles.emptyMessage}>
          Vous n'avez pas encore de personnage. Créez-en un pour commencer à
          jouer!
        </p>
      ) : (
        <div className={styles.charactersGrid}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => router.push(`/characters/${character.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
