// components/Navbar.js
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Jeu de Plateau</Link>
      </div>

      <div className={styles.navLinks}>
        {isAuthenticated ? (
          <>
            <Link href="/characters">
              <span className={styles.navLink}>Personnages</span>
            </Link>
            <Link href="/game">
              <span className={styles.navLink}>Jouer</span>
            </Link>
            <Link href="/inventory">
              <span className={styles.navLink}>Inventaire</span>
            </Link>
            <div className={styles.userMenu}>
              <span className={styles.username}>{currentUser?.username}</span>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <span className={styles.navLink}>Connexion</span>
            </Link>
            <Link href="/register">
              <span className={styles.navLink}>Inscription</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
