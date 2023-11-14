import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";

interface BonusProps {
  title: string;
  info: string | number;
}

const BonusBox: React.FC<BonusProps> = ({ title, info }) => (
  <View style={styles.box}>
    <Text style={styles.title}>{title}: </Text>
    <Text style={styles.info}>{info}</Text>
  </View>
);

const Bonuses: React.FC = () => {
  return (
    <View style={styles.container}>
      <BonusBox title="Passive Perception" info={14} />
      <BonusBox title="Proficiency Bonus" info="+2" />
      <BonusBox title="Spell Attack" info="+6" />
      <BonusBox title="Spell Save DC" info={14} />
    </View>
  );
};

export default Bonuses;

const styles = StyleSheet.create({
  container: {},
  box: {
    flex: 1,
    backgroundColor: Colors.secundary,
    flexDirection: "row",
    borderRadius: 7,
    padding: 15,
    width: 240,
    marginBottom: 10,
  },
  title: {
    color: Colors.primary,
    fontFamily: "Bold",
    textAlign: "left",
  },
  info: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "left",
  },
});
