import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const Skills: React.FC = () => {
  const onPressHandler = () => {};

  const uniqueSkills: { name: string; modifier: number }[] = [
    { name: "Acrobatics (DEX)", modifier: 3 },
    { name: "Animal Handling (WIS)", modifier: 2 },
    { name: "Arcana (INT)", modifier: 1 },
    { name: "Athletics (STR)", modifier: 5 },
    { name: "Deception (CHA)", modifier: 6 },
    { name: "History (INT)", modifier: 1 },
    { name: "Insight (WIS)", modifier: 2 },
    { name: "Intimidation (CHA)", modifier: 6 },
    { name: "Investigation (INT)", modifier: 1 },
    { name: "Medicine (WIS)", modifier: 2 },
    { name: "Nature (INT)", modifier: 1 },
    { name: "Perception (WIS)", modifier: 2 },
    { name: "Performance (CHA)", modifier: 6 },
    { name: "Persuasion (CHA)", modifier: 6 },
    { name: "Religion (INT)", modifier: 1 },
    { name: "Sleight of Hand (DEX)", modifier: 3 },
    { name: "Stealth (DEX)", modifier: 3 },
    { name: "Survival (WIS)", modifier: 2 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Skills</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.rows}>
        {uniqueSkills.map((skill, index) => (
          <View style={styles.row} key={index}>
            <TouchableOpacity onPress={onPressHandler}>
              <Ionicons
                style={styles.button}
                name="radio-button-on"
                size={20}
              />
            </TouchableOpacity>
            <View style={styles.alignRight}>
              <Text style={styles.name}>{skill.name}</Text>
              <Text style={styles.modifier}>
                {skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Skills;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    flexDirection: "column",
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "90%",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 25,
    color: Colors.Darkest,
    textAlign: "right",
  },
  line: {
    borderWidth: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "44%",
  },
  name: {
    color: Colors.Darkest,
    fontFamily: "Bold",
    fontSize: 12,
    marginRight: 15,
  },
  modifier: {
    color: Colors.primary,
    fontFamily: "Regular",
    fontSize: 12,
  },
  rows: {
    flexDirection: "row",
    flex: 1,
    width: "90%",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 5,
    justifyContent: "space-between",
  },
  alignRight: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "flex-end",
  },
  button: {},
});
