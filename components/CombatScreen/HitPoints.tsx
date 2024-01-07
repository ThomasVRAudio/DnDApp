import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../styles/Colors";
import AddButton from "./AddButton";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HealthData } from "../DataInterfaces";
import { database } from "../Database";

const HitPoints = () => {
  const [maxHealth, setMaxHealth] = useState<number>(10);
  const [health, setHealth] = useState<number>(0);
  const [tempHealth, setTempHealth] = useState<number>(0);
  const [editMaxAmount, setEditMaxAmount] = useState<number>(0);

  type Operation = "add" | "subtract" | "reset";

  const onEditHealth = (operation: Operation) => {
    switch (operation) {
      case "add":
        database.UpdateTable("Health", "currentHealth", "amount", health + 1);
        break;
      case "subtract":
        database.UpdateTable("Health", "currentHealth", "amount", health - 1);
        break;
      case "reset":
        database.UpdateTable("Health", "currentHealth", "amount", maxHealth);
        break;
    }

    fetchData();
  };

  const onEditTempHealth = (operation: Operation) => {
    switch (operation) {
      case "add":
        database.UpdateTable("Health", "tempHealth", "amount", tempHealth + 1);
        break;
      case "subtract":
        database.UpdateTable("Health", "tempHealth", "amount", tempHealth - 1);
        break;
      case "reset":
        database.UpdateTable("Health", "tempHealth", "amount", 0);
        break;
    }

    fetchData();
  };

  const onEditMaxHealth = (amount: number) => {
    database.UpdateTable("Health", "maxHealth", "amount", amount);

    fetchData();
  };

  const fetchData = async () => {
    try {
      const fetchedData = await database.GetData<HealthData>("Health");

      const maxHealth = fetchedData?.find((e) => e.name === "maxHealth");
      const currentHealth = fetchedData?.find(
        (e) => e.name === "currentHealth"
      );
      const tempHealth = fetchedData?.find((e) => e.name === "tempHealth");

      setMaxHealth(maxHealth?.amount ?? 0);
      setTempHealth(tempHealth?.amount ?? 0);
      setHealth(currentHealth?.amount ?? 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.upperHitPointTracker}>
        <View style={styles.header}>
          <Text style={styles.text}>Hit Point Maximum: </Text>
          <TextInput
            style={styles.textMaxHealth}
            placeholder={maxHealth.toString()}
            placeholderTextColor={styles.textMaxHealth.color}
            onChangeText={(text) => setEditMaxAmount(parseInt(text))}
            onSubmitEditing={() => onEditMaxHealth(editMaxAmount)}
          ></TextInput>
          <View style={styles.reloadContainer}>
            <Ionicons
              style={styles.reload}
              name="reload"
              size={20}
              onPress={() => onEditHealth("reset")}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <AddButton operation="subtract" func={onEditHealth} />
          <Text style={styles.hitPoints}>{health}</Text>
          <AddButton operation="add" func={onEditHealth} />
        </View>
      </View>
      <View style={styles.lowerHitPointTracker}>
        <View style={styles.header}>
          <View style={styles.reloadContainerBottom}>
            <Ionicons
              style={styles.reload}
              name="reload"
              size={20}
              onPress={() => onEditTempHealth("reset")}
            />
          </View>
        </View>
        <View style={styles.middle}>
          <AddButton operation="subtract" func={onEditTempHealth} />
          <Text style={styles.hitPoints}>{tempHealth}</Text>
          <AddButton operation="add" func={onEditTempHealth} />
        </View>
        <Text style={styles.textBottom}>Temporary Hit Points</Text>
      </View>
    </View>
  );
};

export default HitPoints;

const styles = StyleSheet.create({
  upperHitPointTracker: {
    backgroundColor: Colors.secundary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    height: 163,
    width: 280,
    padding: 10,
    paddingTop: 2,
    flexDirection: "column",
    marginBottom: 10,
  },
  lowerHitPointTracker: {
    backgroundColor: Colors.secundary,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 163,
    width: 280,
    padding: 10,
    paddingTop: 2,
    flexDirection: "column",
  },
  header: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Regular",
    color: Colors.primary,
  },
  textMaxHealth: {
    fontFamily: "Regular",
    color: Colors.primary,
  },
  textBottom: {
    textAlign: "center",
    fontFamily: "Regular",
    color: Colors.primary,
  },
  middle: {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
  },
  hitPoints: {
    fontFamily: "Regular",
    color: Colors.primary,
    fontSize: 40,
  },
  reload: {
    marginLeft: 20,
  },
  reloadContainer: {
    width: 50,
    alignItems: "flex-end",
  },
  reloadContainerBottom: {
    width: "90%",
    alignItems: "flex-end",
  },
});
