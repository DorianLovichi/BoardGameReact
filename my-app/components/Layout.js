// components/Layout.js
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const router = useRouter();

  // Routes qui ne nécessitent pas d'authentification
  const publicRoutes = ["/login", "/register"];

  // Si l'utilisateur n'est pas authentifié et que la route nécessite une authentification
  if (
    !loading &&
    !isAuthenticated &&
    !publicRoutes.includes(router.pathname) &&
    router.pathname !== "/"
  ) {
    // Redirection vers la page de connexion
    router.push("/login");
    return null;
  }

  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2025 Jeu de Plateau - Tous droits réservés</p>
      </footer>
    </div>
  );
}
