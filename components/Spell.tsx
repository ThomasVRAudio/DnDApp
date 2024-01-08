import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SpellData, SpellDataToMap } from "./DataInterfaces";
import Colors from "../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  data: SpellDataToMap;
  showSpellDescription: (data: SpellDataToMap) => void;
}

const Spell = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.showSpellDescription(props.data)}
    >
      <Text style={styles.title}>{props.data?.name}</Text>
      {parseInt(props.data.level) === 0 ? (
        <Text style={styles.level}>Cantrip</Text>
      ) : props.data.level === "Trait" ? (
        <Text style={styles.level}>{props.data.level}</Text>
      ) : (
        <Text style={styles.level}>Level {parseFloat(props.data.level)}</Text>
      )}
      <Text style={styles.amount}>
        {" "}
        {parseInt(props.data.level) === 0 ? (
          <Ionicons name="flash" size={15} />
        ) : (
          <View></View>
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default Spell;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    flexDirection: "row",
    borderRadius: 7,
    padding: 15,
    width: "48%",
    marginBottom: 10,
  },
  title: {
    color: Colors.primary,
    fontFamily: "Bold",
    textAlign: "left",
    flex: 2,
  },
  level: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "left",
    flex: 1,
  },
  amount: {
    color: Colors.primary,
    fontFamily: "Regular",
    flex: 0.5,
    textAlign: "right",
  },
});
