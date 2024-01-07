import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../../styles/Colors";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  amount: number;
  max: number;
  name: string;
  id: number;
  editMode: boolean;
  subtractSlot: (index: number) => void;
  setMaxAmount: (id: number, maxAmount: number) => void;
  deleteItem: (id: number) => void;
  setTitle: (id: number, name: string) => void;
}

const Counter = (props: Props) => {
  const [maxValue, setMaxValue] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.levelBlock}>
        <View style={styles.levelNumberContainer}>
          <TouchableOpacity onPress={() => props.subtractSlot(props.id)}>
            <Text style={styles.levelNumber}>{props.amount}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.levelTitleContainer}>
          <TextInput
            style={styles.levelTitle}
            multiline={true}
            onChangeText={(newText) => {
              setTitle(newText);
            }}
            onSubmitEditing={() => {
              props.setTitle(props.id, title);
            }}
            onBlur={() => {
              props.setTitle(props.id, title);
            }}
          >
            {props.name}
          </TextInput>
        </View>
      </View>
      <View style={styles.maxContainer}>
        <Text style={styles.maxContainerText}>Max:</Text>
        <TextInput
          style={styles.maxContainerText}
          placeholder={props.max.toString()}
          onChangeText={(text) => setMaxValue(parseInt(text))}
          onSubmitEditing={() => props.setMaxAmount(props.id, maxValue)}
          keyboardType="numeric"
        ></TextInput>
      </View>
      {props.editMode ? (
        <TouchableOpacity onPress={() => props.deleteItem(props.id)}>
          <Ionicons
            style={styles.removeButton}
            name="trash"
            size={20}
            color={Colors.Darkest}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    width: 100,
    justifyContent: "space-between",
    height: "auto",
    marginHorizontal: 5,
  },
  levelBlock: {
    backgroundColor: Colors.secundary,
    height: 100,
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
    flex: 1.5,
    justifyContent: "center",
  },
  removeButton: {
    padding: 4,
    alignSelf: "center",
  },
});
