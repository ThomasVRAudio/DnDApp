import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const SavingThrows: React.FC = () => {
  const onPressHandler = () => {};

  const savingThrows = [
    { name: "Strength", modifier: -1 },
    { name: "Dexterity", modifier: 5 },
    { name: "Constitution", modifier: 1 },
    { name: "Intelligence", modifier: 1 },
    { name: "Wisdom", modifier: 2 },
    { name: "Charisma", modifier: 6 },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Saving Throws</Text>
      </View>
      <View style={styles.rows}>
        {savingThrows.map((save, index) => (
          <View style={styles.row} key={index}>
            <TouchableOpacity onPress={onPressHandler}>
              <Ionicons
                style={styles.button}
                name="radio-button-on"
                size={20}
              />
            </TouchableOpacity>
            <View style={styles.alignRight}>
              <Text style={styles.name}>{save.name}</Text>
              <Text style={styles.modifier}>
                {save.modifier >= 0 ? `+${save.modifier}` : save.modifier}
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
