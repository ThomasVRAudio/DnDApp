import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { EquipmentData } from "../DataInterfaces";

interface Props {
  equipment: EquipmentData | null;
}

export default function Weapon({ equipment }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>ATK Bonus</Text>
        <Text style={styles.headerText}>Damage/Type</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.dataText}>{equipment?.name}</Text>
        <Text style={styles.dataText}>+5</Text>
        <Text style={styles.dataText}>{equipment?.damage?.damage_dice}</Text>
      </View>
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
});
