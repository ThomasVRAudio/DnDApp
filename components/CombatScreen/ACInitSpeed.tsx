import { View, StyleSheet, Text, TextInput } from "react-native";
import UpperStat from "./UpperStat";
import { useEffect, useState } from "react";
import { database } from "../Database";
import { ModifierData, SpeedData } from "../DataInterfaces";
import Colors from "../../styles/Colors";

interface Props {
  AC: number;
}

const ACInitSpeed = (props: Props) => {
  const [speed, setSpeed] = useState<number>();
  const [editSpeed, setEditSpeed] = useState<number>(0);
  const [Initiative, setInitiative] = useState<number>(0);

  useEffect(() => {
    //database.CreateTables();
    //database.InsertIntoTable("Speed", ["name", "amount"], ["speed", 0]);
    fetchData();
    console.log("testing here: " + props.AC);
  }, [, props.AC]);

  const fetchData = async () => {
    try {
      const speedData = await database.GetData<SpeedData>("Speed");
      const speedValue = speedData?.find((e) => e.name === "speed");
      setSpeed(speedValue?.amount ?? 0);

      const modifiers = await database.GetData<ModifierData>("Modifiers");

      const dex = modifiers?.find((e) => e.name === "Dexterity")?.amount;
      setInitiative(Math.floor((dex ?? 0) - 10) / 2);
    } catch (error) {}
  };

  const onEditSpeed = (amount: number) => {
    database.UpdateTable("Speed", "speed", "amount", amount);
  };

  return (
    <View style={styles.container}>
      <UpperStat name={"Armor Class"} number={props.AC} isSharp={true} />
      <UpperStat name={"Initiative"} number={Initiative} isSharp={false} />
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
});
