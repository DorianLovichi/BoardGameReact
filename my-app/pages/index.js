// pages/index.js
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Bienvenue dans le Jeu de Plateau</h1>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => router.push("/characters")}
          >
            Gérer mes personnages
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/game")}
          >
            Lancer une partie
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/inventory")}
          >
            Gérer mon inventaire
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jeu de Plateau - Aventure Fantastique</h1>
      <p className={styles.description}>
        Créez votre héros, affrontez des ennemis et gagnez des trésors dans
        cette aventure épique!
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => router.push("/login")}>
          Se connecter
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/register")}
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
}
