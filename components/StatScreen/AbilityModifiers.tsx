import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../styles/Colors";

import { getData, updateTable } from "../database";
import { ModifierData } from "../DataInterfaces";

const AbilityModifiers: React.FC = () => {
  const [data, setData] = useState<ModifierData[] | null>(null);

  const fetchData = async () => {
    try {
      const data = await getData<ModifierData>("Modifiers");
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onConfirmChange = (name: string, amount: number) => {
    updateTable("Modifiers", name, "amount", amount);
    fetchData();
  };

  // insertIntoTable("Modifiers", ["name", "amount"], ["Dexterity", 8]);
  // insertIntoTable("Modifiers", ["name", "amount"], ["Constitution", 8]);
  // insertIntoTable("Modifiers", ["name", "amount"], ["Intelligence", 8]);
  // insertIntoTable("Modifiers", ["name", "amount"], ["Wisdom", 8]);
  // insertIntoTable("Modifiers", ["name", "amount"], ["Charisma", 8]);

  return (
    <View style={styles.container}>
      {data?.map((ability, index) => (
        <View style={styles.block} key={index}>
          <Text style={styles.title}>{ability.name}</Text>
          <TextInput
            onSubmitEditing={(e) => {
              onConfirmChange(ability.name, parseInt(e.nativeEvent.text));
            }}
            style={styles.number}
          >
            {ability.amount}
          </TextInput>
          <Text style={styles.modifier}>
            {Math.round((ability.amount - 10) / 2) >= 0
              ? `+${Math.round((ability.amount - 10) / 2)}`
              : Math.round((ability.amount - 10) / 2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AbilityModifiers;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    backgroundColor: Colors.secundary,
    flexDirection: "column",
    borderRadius: 7,
    paddingVertical: 12,
    width: "30%",
    margin: 5,
    elevation: 5,
    shadowRadius: 10,
    alignItems: "center",
    height: "42%",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Regular",
    color: Colors.primary,
    fontSize: 13,
    textAlign: "center",
  },
  number: {
    fontFamily: "Regular",
    color: Colors.Tertiary,
    fontSize: 20,
    textAlign: "center",
  },
  modifier: {
    fontFamily: "Regular",
    color: Colors.primary,
    fontSize: 16,
    textAlign: "center",
  },
});
