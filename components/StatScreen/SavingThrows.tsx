import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ModifierData, SavingThrowData } from "../DataInterfaces";
import { database } from "../Database";
import { GetProficiencyBonusAsync } from "../../helper";

interface LinkedData {
  name: string;
  modifier?: number;
  status: number;
}

const SavingThrows: React.FC = () => {
  const [linkedData, setLinkedData] = useState<LinkedData[] | null>(null);
  const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);

  const onPressHandler = (save: SavingThrowData) => {
    database.UpdateTable(
      "SavingThrows",
      save.name,
      "status",
      save.status === 1 ? 0 : 1
    );
    fetchData();
  };

  const fetchData = async () => {
    try {
      const savingData = await database.GetData<SavingThrowData>(
        "SavingThrows"
      );
      const modData = await database.GetData<ModifierData>("Modifiers");

      linkData(modData, savingData);
      let profBonus = await GetProficiencyBonusAsync();
      setProficiencyBonus(profBonus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const linkData = (
    modData: ModifierData[] | null,
    saveData: SavingThrowData[] | null
  ): void => {
    const newLinkedData: LinkedData[] =
      saveData?.map((obj) => ({
        name: obj.name,
        modifier: modData?.find((mod) => mod.name === obj.name)?.amount,
        status: obj.status,
      })) ?? [];

    setLinkedData(newLinkedData);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Saving Throws</Text>
      </View>
      <View style={styles.rows}>
        {linkedData?.map((data, index) => (
          <View style={styles.row} key={index}>
            <TouchableOpacity onPress={() => onPressHandler(data)}>
              <Ionicons
                style={styles.button}
                name={data.status ? "radio-button-on" : "radio-button-off"}
                size={20}
              />
            </TouchableOpacity>
            <View style={styles.alignRight}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.modifier}>
                {data.status === 1
                  ? `${
                      proficiencyBonus +
                        Math.floor(((data.modifier ?? 0) - 10) / 2) >=
                      0
                        ? `+${
                            proficiencyBonus +
                            Math.floor(((data.modifier ?? 0) - 10) / 2)
                          }`
                        : `${
                            proficiencyBonus +
                            Math.floor(((data.modifier ?? 0) - 10) / 2)
                          }`
                    }`
                  : `${
                      Math.floor(((data.modifier ?? 0) - 10) / 2) >= 0
                        ? `+${Math.floor(((data.modifier ?? 0) - 10) / 2)}`
                        : `${Math.floor(((data.modifier ?? 0) - 10) / 2)}`
                    }`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SavingThrows;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    flexDirection: "column",
    borderRadius: 12,
    paddingVertical: 12,
    width: 230,
    margin: 5,
    height: "90%",
    alignItems: "center",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 22,
    color: Colors.Darkest,
    textAlign: "center",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  button: {
    flex: 1,
  },
  name: {
    color: Colors.Darkest,
    fontFamily: "Bold",
    fontSize: 14,
    marginRight: 15,
  },
  modifier: {
    color: Colors.primary,
    fontFamily: "Regular",
    fontSize: 14,
  },
  rows: {
    flexDirection: "column",
    flex: 1,
    width: "80%",
    justifyContent: "space-between",
  },
  alignRight: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "flex-end",
  },
});
