import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../styles/Colors";
import { database } from "../Database";

interface Info {
  name: string;
  info: string;
}

interface CharDetails {
  Name: string;
  Level: string;
  Race: string;
  Background: string;
  Class: string;
  Alignment: string;
  Experience: string;
}

const CharacterDetails = () => {
  const [data, setData] = useState<CharDetails | null>(null);

  const fetchData = async () => {
    try {
      const fetchedData = await database.GetData<Info>("CharacterDetails");

      const propertyMapping: Record<keyof CharDetails, string> = {
        Name: "Name",
        Level: "Level",
        Race: "Race",
        Background: "Background",
        Class: "Class",
        Alignment: "Alignment",
        Experience: "Experience",
      };

      let newDetails: CharDetails = {
        Name: "null",
        Level: "1",
        Race: "null",
        Background: "null",
        Class: "null",
        Alignment: "null",
        Experience: "1",
      };

      Object.entries(propertyMapping).forEach(([propertyName, dataName]) => {
        newDetails[propertyName as keyof CharDetails] =
          fetchedData?.find((d) => d.name === dataName)?.info || "null";
      });
      setData(newDetails);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onConfirmChange = (name: string, info: string) => {
    database.UpdateTable("CharacterDetails", name, "info", info);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name: </Text>
        <TextInput
          onSubmitEditing={(e) => {
            onConfirmChange("Name", e.nativeEvent.text);
          }}
          style={styles.name}
        >
          {data?.Name}
        </TextInput>
      </View>
      <View style={styles.line}></View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Level</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Level", e.nativeEvent.text);
              }}
              style={styles.info}
            >
              {data?.Level}
            </TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Race</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Race", e.nativeEvent.text);
              }}
              style={styles.info}
            >
              {data?.Race}
            </TextInput>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Background</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Background", e.nativeEvent.text);
              }}
              style={styles.info}
            >
              {data?.Background}
            </TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Class</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Class", e.nativeEvent.text);
              }}
              style={styles.info}
            >
              {data?.Class}
            </TextInput>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Alignment</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Alignment", e.nativeEvent.text);
              }}
              style={styles.info}
            >
              {data?.Alignment}
            </TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Experience</Text>
            <TextInput
              onSubmitEditing={(e) => {
                onConfirmChange("Experience", e.nativeEvent.text);
              }}
              style={styles.infoRight}
            >
              {data?.Experience}
            </TextInput>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    borderRadius: 10,
    width: 300,
    elevation: 5,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 20,
    color: Colors.Tertiary,
  },
  name: {
    fontFamily: "Regular",
    fontSize: 20,
    color: Colors.Tertiary,
  },
  line: {
    borderWidth: 1,
    width: "100%",
    alignSelf: "center",
  },

  info: {
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.primary,
  },
  infoTitle: {
    fontFamily: "Bold",
    fontSize: 12,
    color: Colors.primary,
  },
  infoRight: {
    fontFamily: "Regular",
    fontSize: 12,
    color: Colors.primary,
    textAlign: "right",
  },
  infoTitleRight: {
    fontFamily: "Bold",
    fontSize: 12,
    color: Colors.primary,
    textAlign: "right",
  },
  infoContainer: {
    paddingTop: 10,
  },
  infoSubContainer: {},
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});
