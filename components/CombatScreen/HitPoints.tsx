import { View, Text, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";
import AddButton from "./AddButton";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const HitPoints = () => {
  const [maxHealth, setMaxHealth] = useState<number>(23);
  const [health, setHealth] = useState<number>(0);
  const [tempHealth, setTempHealth] = useState<number>(0);

  type Operation = "add" | "subtract" | "reset";

  const onEditHealth = (operation: Operation) => {
    switch (operation) {
      case "add":
        setHealth(health + 1);
        break;
      case "subtract":
        setHealth(health - 1);
        break;
      case "reset":
        setHealth(maxHealth);
        break;
    }
  };

  const onEditTempHealth = (operation: Operation) => {
    switch (operation) {
      case "add":
        setTempHealth(tempHealth + 1);
        break;
      case "subtract":
        setTempHealth(tempHealth - 1);
        break;
      case "reset":
        setTempHealth(0);
        break;
    }
  };

  return (
    <View>
      <View style={styles.upperHitPointTracker}>
        <View style={styles.header}>
          <Text style={styles.text}>Hit Point Maximum: {maxHealth}</Text>
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
    flexDirection: "column",
  },
  header: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
  },
  text: {
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
