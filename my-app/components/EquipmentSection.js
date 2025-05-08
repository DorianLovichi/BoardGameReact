// components/EquipmentSection.js
import { useState } from "react";
import { equipItem } from "../api/characters";
import styles from "../styles/EquipmentSection.module.css";

export default function EquipmentSection({
  character,
  availableItems,
  setCharacter,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showItemList, setShowItemList] = useState(false);

  // Filtrer les objets par type correspondant au slot sélectionné
  const getFilteredItems = () => {
    if (!selectedSlot) return [];

    const slotTypeMap = {
      weapon: "weapon",
      armor: "armor",
      accessory: "accessory",
    };

    return availableItems.filter(
      (item) =>
        item.type === slotTypeMap[selectedSlot] &&
        (!character.equipment[selectedSlot] ||
          item.id !== character.equipment[selectedSlot].id)
    );
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowItemList(true);
  };

  const handleEquipItem = async (item) => {
    try {
      const updatedCharacter = await equipItem(
        character.id,
        selectedSlot,
        item.id
      );
      setCharacter(updatedCharacter);
      setShowItemList(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Erreur lors de l'équipement de l'objet:", error);
    }
  };

  const handleUnequipItem = async (slot) => {
    try {
      const updatedCharacter = await equipItem(character.id, slot, null);
      setCharacter(updatedCharacter);
    } catch (error) {
      console.error("Erreur lors du retrait de l'objet:", error);
    }
  };

  return (
    <div className={styles.equipmentSection}>
      <h3 className={styles.title}>Équipement</h3>

      <div className={styles.equipmentSlots}>
        <div
          className={`${styles.slot} ${
            selectedSlot === "weapon" ? styles.selected : ""
          }`}
          onClick={() => handleSlotClick("weapon")}
        >
          <h4>Arme</h4>
          {character.equipment.weapon ? (
            <div className={styles.equippedItem}>
              <p className={styles.itemName}>
                {character.equipment.weapon.name}
              </p>
              {Object.entries(character.equipment.weapon.stats || {}).map(
                ([key, value]) => (
                  <p key={key} className={styles.itemStat}>
                    {key}: {value}
                  </p>
                )
              )}
              <button
                className={styles.unequipButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnequipItem("weapon");
                }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <p className={styles.emptySlot}>Aucune arme équipée</p>
          )}
        </div>

        <div
          className={`${styles.slot} ${
            selectedSlot === "armor" ? styles.selected : ""
          }`}
          onClick={() => handleSlotClick("armor")}
        >
          <h4>Armure</h4>
          {character.equipment.armor ? (
            <div className={styles.equippedItem}>
              <p className={styles.itemName}>
                {character.equipment.armor.name}
              </p>
              {Object.entries(character.equipment.armor.stats || {}).map(
                ([key, value]) => (
                  <p key={key} className={styles.itemStat}>
                    {key}: {value}
                  </p>
                )
              )}
              <button
                className={styles.unequipButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnequipItem("armor");
                }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <p className={styles.emptySlot}>Aucune armure équipée</p>
          )}
        </div>

        <div
          className={`${styles.slot} ${
            selectedSlot === "accessory" ? styles.selected : ""
          }`}
          onClick={() => handleSlotClick("accessory")}
        >
          <h4>Accessoire</h4>
          {character.equipment.accessory ? (
            <div className={styles.equippedItem}>
              <p className={styles.itemName}>
                {character.equipment.accessory.name}
              </p>
              {Object.entries(character.equipment.accessory.stats || {}).map(
                ([key, value]) => (
                  <p key={key} className={styles.itemStat}>
                    {key}: {value}
                  </p>
                )
              )}
              <button
                className={styles.unequipButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnequipItem("accessory");
                }}
              >
                Retirer
              </button>
            </div>
          ) : (
            <p className={styles.emptySlot}>Aucun accessoire équipé</p>
          )}
        </div>
      </div>

      {showItemList && (
        <div className={styles.itemsModal}>
          <div className={styles.modalContent}>
            <h3>Sélectionnez un objet à équiper</h3>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowItemList(false);
                setSelectedSlot(null);
              }}
            >
              ×
            </button>

            <div className={styles.itemsList}>
              {getFilteredItems().length > 0 ? (
                getFilteredItems().map((item) => (
                  <div
                    key={item.id}
                    className={styles.itemCard}
                    onClick={() => handleEquipItem(item)}
                  >
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className={styles.itemStats}>
                      {Object.entries(item.stats || {}).map(([key, value]) => (
                        <p key={key}>
                          {key}: {value}
                        </p>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noItems}>
                  Aucun objet disponible pour cet emplacement.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
