import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { EquipmentData } from "../DataInterfaces";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

interface Props {
  equipment: EquipmentData | null;
  removeArmor: (name: string) => void;
}

export default function Armor({ equipment, removeArmor }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
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
      </TouchableOpacity>
      {isOpen ? (
        <View style={styles.extension}>
          <View style={styles.removeContainer}>
            <Ionicons
              style={styles.removeButton}
              name="trash"
              size={20}
              onPress={() => removeArmor(equipment?.name ?? "null")}
            />
          </View>
        </View>
      ) : (
        <View></View>
      )}
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
  extension: {
    paddingTop: 2,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  removeContainer: {
    flex: 1,
    padding: 2,
    justifyContent: "center",
  },
  removeButton: {},
  extensionText: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "LightItalic",
    textAlign: "left",
    fontSize: 12,
    flex: 1,
    padding: 2,
  },
  modifier: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  modifierSection: {
    flexDirection: "row",
    flex: 7,
  },
});
