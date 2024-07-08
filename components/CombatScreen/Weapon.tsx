import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { EquipmentData, ModifierData } from "../DataInterfaces";
import React, { useEffect, useState } from "react";
import { GetProficiencyBonusAsync } from "../../helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { database } from "../database";

interface Props {
  equipment: EquipmentData | null;
  removeWeapon: (name: string) => void;
  modifierData: ModifierData[] | null;
  modifiersChanged: boolean;
}

export default function Weapon({
  equipment,
  removeWeapon,
  modifierData,
  modifiersChanged,
}: Props) {
  const [profBonus, setProfBonus] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modifier, setModifier] = useState<string>("");
  const [modifierAmount, setModifierAmount] = useState<number>(0);

  useEffect(() => {
    fetchBonus();

    if (equipment?.modifier) {
      setModifier(equipment.modifier);
    }
  }, [, modifierData]);

  const fetchBonus = async () => {
    let prof = await GetProficiencyBonusAsync();
    setProfBonus(prof);
  };

  useEffect(() => {
    let amount: number = Math.floor(
      ((modifierData?.find((d) => d.name === modifier)?.amount ?? 0) - 10) / 2
    );
    setModifierAmount(amount);
  }, [modifier, modifierData]);

  const selectAbility = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  const setCustomModifier = (index: number, modifier: string) => {
    if (!equipment?.name) return;

    database.UpdateTable("Weaponset", equipment.name, "modifier", modifier);
    setModifier(modifier);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.row}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>ATK Bonus</Text>
          <Text style={styles.headerText}>Damage/Type</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.dataText}>{equipment?.name}</Text>
          <Text style={styles.dataText}>
            {modifierAmount + profBonus >= 0 ? `+` : ``}
            {modifierAmount + profBonus}
          </Text>
          <Text style={styles.dataText}>{`${equipment?.damage?.damage_dice}${
            modifierAmount >= 0 ? `+` : ``
          }${modifierAmount}`}</Text>
        </View>
      </TouchableOpacity>
      {isOpen ? (
        <View style={styles.extension}>
          <View style={styles.modifierSection}>
            <Text style={styles.extensionText}>Ability Modifier: </Text>
            <SelectDropdown
              renderDropdownIcon={() => <Ionicons name="caret-down"></Ionicons>}
              buttonStyle={styles.dropDown}
              buttonTextStyle={styles.dropDownText}
              dropdownStyle={styles.dropDownOpen}
              rowTextStyle={styles.dropDownOpenText}
              data={selectAbility}
              defaultValue={modifier}
              showsVerticalScrollIndicator={false}
              onSelect={(selectedItem) => {
                setCustomModifier(0, String(selectedItem));
              }}
            />
          </View>
          <View style={styles.removeContainer}>
            <TouchableOpacity
              onPress={() => removeWeapon(equipment?.name ?? "null")}
            >
              <Ionicons style={styles.removeButton} name="trash" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: Colors.primary,
    fontFamily: "Bold",
    fontSize: 12,
    flex: 1,
  },
  dataText: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "left",
    fontSize: 12,
    flex: 1,
  },
  extension: {
    paddingTop: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  removeContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  removeButton: {},
  extensionText: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "LightItalic",
    textAlign: "left",
    fontSize: 12,
    flex: 1,
    padding: 6,
  },
  modifier: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  modifierSection: {
    flexDirection: "row",
    flex: 7,
  },
  dropDown: {
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  dropDownText: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
  },
  dropDownOpen: {
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  dropDownOpenText: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
  },
});
