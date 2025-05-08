// pages/inventory.js
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import { getUserInventory, sellItem } from "../api/inventory";
import styles from "../styles/Inventory.module.css";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gold, setGold] = useState(0);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchInventory = async () => {
      try {
        const data = await getUserInventory();
        setInventory(data.items);
        setGold(data.gold);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'inventaire:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [isAuthenticated, router]);

  const handleSellItem = async (itemId) => {
    try {
      const { gold: newGold } = await sellItem(itemId);

      // Mise à jour de l'inventaire et de l'or
      setInventory(inventory.filter((item) => item.id !== itemId));
      setGold(newGold);
    } catch (error) {
      console.error("Erreur lors de la vente de l'objet:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mon Inventaire</h1>

      <div className={styles.goldCounter}>
        <span className={styles.goldIcon}>💰</span>
        <span className={styles.goldAmount}>{gold} pièces d'or</span>
      </div>

      {inventory.length === 0 ? (
        <p className={styles.emptyMessage}>
          Votre inventaire est vide. Partez à l'aventure pour trouver des
          objets!
        </p>
      ) : (
        <div className={styles.inventoryGrid}>
          {inventory.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemType}>{item.type}</p>
              <p className={styles.itemDescription}>{item.description}</p>

              {item.stats && (
                <div className={styles.itemStats}>
                  {Object.entries(item.stats).map(([key, value]) => (
                    <span key={key} className={styles.statItem}>
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.itemActions}>
                <button
                  className={styles.equipButton}
                  onClick={() => router.push("/characters")}
                >
                  Équiper
                </button>
                <button
                  className={styles.sellButton}
                  onClick={() => handleSellItem(item.id)}
                >
                  Vendre ({item.value} or)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
