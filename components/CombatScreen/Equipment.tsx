import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { ArmorData, EquipmentData, WeaponData } from "../DataInterfaces";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AddEquipmentModal from "./AddEquipmentModal";
import React from "react";
import { database } from "../Database";

interface Props {
  element: React.JSX.Element;
  equipment_type: string;
}

const Equipment = (props: Props) => {
  const [equipment, setEquipment] = useState<EquipmentData[] | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const saveEquipment = (equipment: EquipmentData) => {
    if (equipment.equipment_category?.name !== props.equipment_type) return;

    //console.log("save equipment: " + equipment.armor_category);

    if (equipment.equipment_category?.name === "Armor") {
      database.InsertIntoTable(
        `Armorset`,
        ["name", "category", "base", "dexBonus"],
        [
          equipment.name,
          equipment.armor_category,
          equipment.armor_class?.base,
          equipment.armor_class?.dex_bonus ? 1 : 0,
        ]
      );
    }

    if (equipment.equipment_category?.name === "Weapon") {
      let finesse = equipment.properties?.find((p) => p.name === "Finesse")
        ? 1
        : 0;

      database.InsertIntoTable(
        `Weaponset`,
        ["name", "damageDice", "finesse"],
        [equipment.name, equipment.damage?.damage_dice, finesse]
      );
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      let allEquipment: EquipmentData[] = [];

      if (props.equipment_type === "Armor") {
        const data = await database.GetData<ArmorData>(
          `${props.equipment_type}set`
        );

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
          };

          console.log("Data: " + d.dexBonus);

          allEquipment.push(equipmentItem);
        });
      }

      if (props.equipment_type === "Weapon") {
        const data = await database.GetData<WeaponData>(
          `${props.equipment_type}set`
        );

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
          };

          allEquipment.push(equipmentItem);
        });
      }

      setEquipment(allEquipment);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //database.TestDataBase();
    database.CreateTables();
    //database.DropTable("Weaponset");
    //database.DropTable("Armorset");
    //database.RemoveAllRows("Armorset");
    //database.RemoveAllRows("Weaponset");
  }, []);

  return (
    <View>
      <ScrollView style={styles.weaponsContainer}>
        {equipment?.map((equipmentItem, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(props.element, { equipment: equipmentItem })}
          </React.Fragment>
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
    maxHeight: 130,
  },
});
