import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
  id: number;
  updateItem: (index: number, title: string, desc: string) => void;
  deleteItem: (index: number) => void;
}

export const Item = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setTitle(props.title);
    setDesc(props.description);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        onChangeText={(newText) => {
          setTitle(newText);
        }}
        onSubmitEditing={() => {
          props.updateItem(props.id, title, desc);
          setIsOpen(false);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          setIsOpen(false);
        }}
      >
        {props.title}
      </TextInput>
      <View style={desc.length === 0 ? null : styles.line}></View>
      <TextInput
        multiline={true}
        style={styles.description}
        onChangeText={(newText) => {
          setDesc(newText);
        }}
        onSubmitEditing={() => {
          props.updateItem(props.id, title, desc);
          setIsOpen(false);
        }}
        onBlur={() => {
          props.updateItem(props.id, title, desc);
          setIsOpen(false);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
      >
        {props.description}
      </TextInput>
      {isOpen ? (
        <View style={styles.removeContainer}>
          <Ionicons
            style={styles.removeButton}
            name="trash"
            size={20}
            onTouchStart={() => props.deleteItem(props.id)}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.secundary,
    borderRadius: 10,
    elevation: 5,
    opacity: 1,
    marginBottom: 10,
  },
  line: {
    borderWidth: 1,
    width: "100%",
    alignSelf: "center",
    marginVertical: 4,
  },
  description: {
    color: Colors.Darkest,
    fontFamily: "Regular",
    fontSize: 12,
    flexWrap: "nowrap",
    textAlign: "justify",
  },
  title: {
    color: Colors.Darkest,
    fontFamily: "Bold",
    textAlign: "left",
    fontSize: 20,
  },
  removeContainer: {
    width: "100%",
    alignItems: "flex-end",
    opacity: 0.4,
  },
  removeButton: {
    padding: 4,
  },
});
