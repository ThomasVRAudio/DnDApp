import { View, Text, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";

type Operation = "add" | "subtract";

interface ButtonProps {
  operation: Operation;
  func: (operation: Operation) => void;
}

export default function AddButton({ operation, func }: ButtonProps) {
  return (
    <View>
      {operation === "add" ? (
        <Text style={styles.containerRight} onPress={() => func("add")}>
          +
        </Text>
      ) : (
        <Text style={styles.containerLeft} onPress={() => func("subtract")}>
          -
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerLeft: {
    backgroundColor: Colors.Tertiary,
    fontSize: 30,
    color: Colors.primary,
    padding: 12,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 40,
    marginRight: 15,
    textAlign: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowRadius: 30,
    elevation: 10,
  },
  containerRight: {
    backgroundColor: Colors.Tertiary,
    fontSize: 30,
    color: Colors.primary,
    padding: 12,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: 40,
    marginLeft: 15,
    textAlign: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowRadius: 30,
    elevation: 10,
  },
});
