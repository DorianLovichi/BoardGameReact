// pages/game.js
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { getCharacters } from "../api/characters";
import { playGame, getRewards } from "../api/game";
import GameBoard from "../components/GameBoard";
import CharacterSelect from "../components/CharacterSelect";
import styles from "../styles/Game.module.css";

export default function Game() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [gameState, setGameState] = useState("select"); // select, playing, reward
  const [gameData, setGameData] = useState(null);
  const [rewards, setRewards] = useState(null);
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

  const startGame = async () => {
    if (!selectedCharacter) return;

    setLoading(true);

    try {
      const data = await playGame(selectedCharacter.id);
      setGameData(data);
      setGameState("playing");
    } catch (error) {
      console.error("Erreur lors du lancement du jeu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameComplete = async (result) => {
    setLoading(true);

    try {
      const rewardsData = await getRewards(selectedCharacter.id, result);
      setRewards(rewardsData);
      setGameState("reward");
    } catch (error) {
      console.error("Erreur lors de la récupération des récompenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = () => {
    setGameState("select");
    setSelectedCharacter(null);
    setGameData(null);
    setRewards(null);
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jeu de Plateau</h1>

      {gameState === "select" && (
        <CharacterSelect
          characters={characters}
          selectedCharacter={selectedCharacter}
          onSelect={setSelectedCharacter}
          onStart={startGame}
        />
      )}

      {gameState === "playing" && gameData && (
        <GameBoard
          gameData={gameData}
          character={selectedCharacter}
          onComplete={handleGameComplete}
        />
      )}

      {gameState === "reward" && rewards && (
        <div className={styles.rewardsContainer}>
          <h2 className={styles.subtitle}>Récompenses</h2>

          <div className={styles.rewards}>
            {rewards.experience && (
              <div className={styles.rewardItem}>
                <span className={styles.rewardLabel}>Expérience gagnée:</span>
                <span className={styles.rewardValue}>
                  {rewards.experience} XP
                </span>
              </div>
            )}

            {rewards.gold && (
              <div className={styles.rewardItem}>
                <span className={styles.rewardLabel}>Or gagné:</span>
                <span className={styles.rewardValue}>
                  {rewards.gold} pièces
                </span>
              </div>
            )}

            {rewards.items && rewards.items.length > 0 && (
              <div className={styles.itemsReward}>
                <span className={styles.rewardLabel}>Objets trouvés:</span>
                <div className={styles.itemsList}>
                  {rewards.items.map((item, index) => (
                    <div key={index} className={styles.itemCard}>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p className={styles.itemStats}>
                        {item.stats &&
                          Object.entries(item.stats).map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}
                            </span>
                          ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.rewardActions}>
            <button className={styles.button} onClick={handlePlayAgain}>
              Jouer à nouveau
            </button>
            <button
              className={styles.button}
              onClick={() => router.push(`/characters/${selectedCharacter.id}`)}
            >
              Retour au personnage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
