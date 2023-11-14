import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { EquipmentData } from "../DataInterfaces";

interface Props {
  equipment: EquipmentData | null;
}

export default function Armor({ equipment }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.headerText}>Defense</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.dataText}>{equipment?.name}</Text>
        <Text style={styles.dataText}>{equipment?.armor_category}</Text>
        <Text
          style={styles.dataText}
        >{`+${equipment?.armor_class?.base}`}</Text>
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
