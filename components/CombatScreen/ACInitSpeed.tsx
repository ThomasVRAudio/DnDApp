import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import UpperStat from "./UpperStat";
import { useEffect, useState } from "react";
import { database } from "../Database";
import { ModifierData, ACInitSpeedData } from "../DataInterfaces";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  AC: number;
  modifiersChanged: boolean;
}

const ACInitSpeed = (props: Props) => {
  const [speed, setSpeed] = useState<number>();
  const [editSpeed, setEditSpeed] = useState<number>(0);
  const [Initiative, setInitiative] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customAC, setCustomAC] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [, props.AC, props.modifiersChanged]);

  const fetchData = async () => {
    try {
      const acInitSpeedData = await database.GetData<ACInitSpeedData>(
        "ACInitSpeed"
      );
      const speedValue = acInitSpeedData?.find((e) => e.name === "speed");
      const acValue = acInitSpeedData?.find((e) => e.name === "ac");
      setSpeed(speedValue?.amount ?? 0);
      setCustomAC(acValue?.amount ?? 0);
      setIsCustom(acValue?.turnedOn ? true : false);

      const modifiers = await database.GetData<ModifierData>("Modifiers");

      const dex = modifiers?.find((e) => e.name === "Dexterity")?.amount;
      setInitiative(Math.floor((dex ?? 0) - 10) / 2);
    } catch (error) {}
  };

  const onEditSpeed = (amount: number) => {
    database.UpdateTable("ACInitSpeed", "speed", "amount", amount);
  };

  const onEditCustomAC = (amount: number) => {
    database.UpdateTable("ACInitSpeed", "ac", "amount", amount);
  };

  const setCustom = (on: boolean) => {
    setIsCustom(on);
    database.UpdateTable("ACInitSpeed", "ac", "turnedOn", on ? 1 : 0);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <View style={styles.containerAC}>
            {isCustom ? (
              <TextInput
                style={[styles.textInput, { margin: -2.5 }]}
                placeholder={props.AC?.toString()}
                onChangeText={(text) => {
                  setCustomAC(parseInt(text));
                }}
                onSubmitEditing={() => onEditCustomAC(customAC)}
              >
                {isNaN(customAC) ? "" : customAC}
              </TextInput>
            ) : (
              <Text style={styles.text}>{props.AC ?? 0}</Text>
            )}

            <Text style={styles.text}>Armor Class</Text>
          </View>
        </TouchableOpacity>
        {isOpen ? (
          <TouchableOpacity onPress={() => setCustom(!isCustom)}>
            <View style={styles.custom}>
              <Text style={styles.customText}>Custom: </Text>
              <Ionicons
                style={{ color: Colors.primary }}
                name={isCustom ? "radio-button-on" : "radio-button-off"}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
      <UpperStat
        name={"Initiative"}
        number={Math.floor(Initiative)}
        isSharp={false}
      />
      <View style={styles.containerSpeed}>
        <TextInput
          style={styles.text}
          placeholder={speed?.toString()}
          onChangeText={(text) => setEditSpeed(parseInt(text))}
          onSubmitEditing={() => onEditSpeed(editSpeed)}
        >
          {speed ?? 0}
        </TextInput>
        <Text style={styles.text}>Speed</Text>
      </View>
    </View>
  );
};

export default ACInitSpeed;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors.primary,
    textAlign: "center",
    fontFamily: "Regular",
  },
  textInput: {
    color: Colors.primary,
    textAlign: "center",
    fontFamily: "Regular",
  },
  containerSpeed: {
    backgroundColor: Colors.secundary,
    width: 105,
    height: 72,
    padding: 5,
    borderRadius: 10,
    margin: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerAC: {
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
  containerACExtension: {},
  custom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.Tertiary,
    padding: 6,
    borderRadius: 10,
  },
  customText: {
    textAlign: "justify",
    fontFamily: "LightItalic",
    color: Colors.primary,
  },
});
