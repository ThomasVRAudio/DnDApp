import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../../styles/Colors";
import { useState } from "react";

interface Props {
  amount: number;
  level: number;
  max: number;
  subtractSlot: (index: number) => void;
  setMaxAmount: (index: number, maxAmount: number) => void;
}

const SpellSlot = (props: Props) => {
  const [maxValue, setMaxValue] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.levelBlock}>
        <View style={styles.levelNumberContainer}>
          <TouchableOpacity onPress={() => props.subtractSlot(props.level)}>
            <Text style={styles.levelNumber}>{props.amount}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.levelTitleContainer}>
          <Text style={styles.levelTitle}>Level {props.level}</Text>
        </View>
      </View>
      <View style={styles.maxContainer}>
        <Text style={styles.maxContainerText}>Max:</Text>
        <TextInput
          style={styles.maxContainerText}
          placeholder={props.max.toString()}
          onChangeText={(text) => setMaxValue(parseInt(text))}
          onSubmitEditing={() => props.setMaxAmount(props.level, maxValue)}
          keyboardType="numeric"
        ></TextInput>
      </View>
    </View>
  );
};

export default SpellSlot;

const styles = StyleSheet.create({
  container: {
    width: 60,
    justifyContent: "space-between",
    height: 110,
  },
  levelBlock: {
    backgroundColor: Colors.secundary,
    height: 80,
    elevation: 5,
    borderRadius: 10,
  },
  levelTitle: {
    fontFamily: "Regular",
    color: Colors.primary,
    textAlign: "center",
    fontSize: 12,
  },
  levelNumber: {
    fontFamily: "Bold",
    color: Colors.primary,
    textAlign: "center",
    fontSize: 24,
  },
  maxContainerText: {
    fontFamily: "Bold",
    color: Colors.Tertiary,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 12,
  },
  maxContainer: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  levelTitleContainer: {
    flex: 1,
  },
  levelNumberContainer: {
    alignContent: "center",
    flex: 2,
    justifyContent: "center",
  },
});
