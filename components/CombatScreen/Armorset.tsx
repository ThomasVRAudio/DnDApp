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
import Armor from "./Armor";

interface Props {
  setArmorClass: (amount: number) => void;
  modifiersChanged: boolean;
}

const Armorset = (props: Props) => {
  const [equipment, setEquipment] = useState<EquipmentData[] | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [dex, setDex] = useState<number>(0);

  const saveEquipment = (equipment: EquipmentData) => {
    if (equipment.equipment_category?.name !== "Armor") return;

    if (equipment.equipment_category?.name === "Armor") {
      database.InsertIntoTable(
        `Armorset`,
        ["name", "category", "base", "dexBonus", "maxBonus"],
        [
          equipment.name,
          equipment.armor_category,
          equipment.armor_class?.base,
          equipment.armor_class?.dex_bonus ? 1 : 0, // true or false
          equipment.armor_class?.max_bonus ?? undefined,
        ]
      );
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      let allEquipment: EquipmentData[] = [];

      const data = await database.GetData<ArmorData>(`Armorset`);
      const modData = await database.GetData<ModifierData>("Modifiers");

      data?.forEach((d: ArmorData) => {
        const equipmentItem: EquipmentData = {
          error: "null",
          name: d.name,
          equipment_category: {
            name: "null",
          },
          damage: {
            damage_dice: "null",
          },
          armor_class: {
            base: d.base,
            dex_bonus: d.dexBonus ? 1 : 0,
          },
          armor_category: d.category,
          properties: [] as { name: string }[],
          finesse: 0,
          id: d.id,
        };

        allEquipment.push(equipmentItem);
      });
      setEquipment(allEquipment);

      let dexBonus = Math.floor(
        ((modData?.find((d) => d.name === "Dexterity")?.amount ?? 0) - 10) / 2
      );
      setDex(dexBonus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setAC();
  }, [equipment, dex]);

  const setAC = () => {
    let AC: number = 0;
    let wearsArmor: boolean = false;

    if (equipment?.length === 0) {
      AC += 10 + dex;
      props.setArmorClass(AC);
      return;
    }

    equipment?.map((e) => {
      AC += e.armor_class?.base ? e.armor_class.base : 0;

      if (e.armor_class?.dex_bonus) {
        let max_bonus: number = e.armor_class?.max_bonus ?? 1000;
        AC += dex > max_bonus ? max_bonus : dex;
      }

      if (
        e.armor_category === "Heavy" ||
        e.armor_category === "Medium" ||
        e.armor_category === "Light"
      ) {
        wearsArmor = true;
      }
    });

    if (wearsArmor === false && equipment?.length !== 0) {
      AC += 10;
    }
    props.setArmorClass(AC);
  };

  useEffect(() => {
    fetchData();
  }, [, props.modifiersChanged]);

  const RemoveArmor = async (name: string) => {
    try {
      await database.RemoveRow("Armorset", name);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
          <Armor
            removeArmor={RemoveArmor}
            key={index}
            equipment={equipmentItem}
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
            equipment_type={"Armor"}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default Armorset;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 100,
  },
  weaponsContainer: {
    maxHeight: 220,
  },
});
