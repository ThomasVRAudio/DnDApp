import { View, Text, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";

interface Props {
  name: string;
  number: number;
  isSharp: boolean;
}

export default function UpperStat({ name, number, isSharp }: Props) {
  return (
    <View style={isSharp ? styles.containerSharp : styles.container}>
      <Text style={styles.text}>{number}</Text>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    width: 105,
    height: 72,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerSharp: {
    backgroundColor: Colors.secundary,
    width: 105,
    height: 72,
    padding: 5,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    margin: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    color: Colors.primary,
    textAlign: "center",
    fontFamily: "Regular",
  },
});
