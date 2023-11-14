import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { EquipmentData } from "../DataInterfaces";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import AddEquipmentModal from "./AddEquipmentModal";
import React from "react";

interface Props {
  element: React.JSX.Element;
  equipment_type: string;
}

const Equipment = (props: Props) => {
  const [equipment, setEquipment] = useState<EquipmentData[] | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <View>
      <ScrollView style={styles.weaponsContainer}>
        {equipment?.map((equipmentItem, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(props.element, { equipment: equipmentItem })}
          </React.Fragment>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setModal(!modal)}
      >
        <AntDesign name="plussquare" size={25}></AntDesign>
      </TouchableOpacity>
      <View>
        {modal ? (
          <AddEquipmentModal
            setModal={setModal}
            setEquipment={setEquipment}
            equipment={equipment}
            equipment_type={props.equipment_type}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 100,
  },
  weaponsContainer: {
    maxHeight: 130,
  },
});
