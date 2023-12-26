import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  ArmorData,
  EquipmentData,
  ModifierData,
  WeaponData,
} from "../DataInterfaces";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AddEquipmentModal from "./AddEquipmentModal";
import React from "react";
import { database } from "../Database";
import Weapon from "./Weapon";

interface Props {
  equipment_type: string;
  modifiersChanged: boolean;
}

const Equipment = (props: Props) => {
  const [equipment, setEquipment] = useState<EquipmentData[] | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [modifiers, setModifiers] = useState<ModifierData[] | null>(null);

  const saveEquipment = async (equipment: EquipmentData) => {
    if (equipment.equipment_category?.name !== props.equipment_type) return;

    if (equipment.equipment_category?.name === "Weapon") {
      let finesse = equipment.properties?.find((p) => p.name === "Finesse")
        ? 1
        : 0;

      let modifier = "Strength";

      let dexAmount: number =
        ((modifiers?.find((d) => d.name === "Dexterity")?.amount ?? 0) - 10) /
        2;
      let strAmount: number =
        ((modifiers?.find((d) => d.name === "Strength")?.amount ?? 0) - 10) / 2;
      if (finesse) {
      }

      if (finesse) {
        modifier = dexAmount > strAmount ? "Dexterity" : "Strength";
      } else if (equipment.weapon_range === "Ranged") {
        modifier = "Dexterity";
      } else {
        modifier = "Strength";
      }

      database.InsertIntoTable(
        `Weaponset`,
        ["name", "damageDice", "finesse", "modifier"],
        [equipment.name, equipment.damage?.damage_dice, finesse, modifier]
      );
    }

    fetchData();
  };

  const RemoveWeapon = async (name: string) => {
    try {
      await database.RemoveRow("Weaponset", name);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      let allEquipment: EquipmentData[] = [];

      const data = await database.GetData<WeaponData>(`Weaponset`);
      const modData = await database.GetData<ModifierData>("Modifiers");
      setModifiers(modData);

      data?.forEach((d) => {
        const equipmentItem: EquipmentData = {
          error: "null",
          name: d.name,
          equipment_category: {
            name: "null",
          },
          damage: {
            damage_dice: d.damageDice,
          },
          armor_class: {
            base: 0,
            dex_bonus: 0,
          },
          armor_category: "null",
          properties: [] as { name: string }[],
          finesse: d.finesse,
          modifier: d.modifier,
          id: d.id,
        };

        allEquipment.push(equipmentItem);
      });
      setEquipment(allEquipment);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [, props.modifiersChanged]);

  useEffect(() => {
    //database.TestDataBase();
    //database.CreateTables();
    //database.DropTable("Weaponset");
    //database.DropTable("Armorset");
    //database.RemoveAllRows("Armorset");
    //database.RemoveAllRows("Weaponset");
  }, []);

  return (
    <View>
      <ScrollView style={styles.weaponsContainer}>
        {equipment?.map((equipmentItem, index) => (
          <Weapon
            removeWeapon={RemoveWeapon}
            key={index}
            equipment={equipmentItem}
            modifierData={modifiers}
            modifiersChanged={props.modifiersChanged}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setModal(!modal)}
      >
        <AntDesign name="plussquare" size={25}></AntDesign>
      </TouchableOpacity>
      <View>
        {modal ? (
          <AddEquipmentModal
            setModal={setModal}
            saveEquipment={saveEquipment}
            equipment={equipment}
            equipment_type={props.equipment_type}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 100,
  },
  weaponsContainer: {
    maxHeight: 220,
  },
});
