import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { database } from "../database";
import { ModifierData, SkillData } from "../DataInterfaces";
import { GetProficiencyBonusAsync } from "../../helper";

interface LinkedData {
  name: string;
  modifier?: number;
  status: number;
}

interface Props {
  modifiersChanged: boolean;
  setSkillChanged: (b: boolean) => void;
  skillChanged: boolean;
}

const Skills: React.FC<Props> = (props: Props) => {
  const [linkedData, setLinkedData] = useState<LinkedData[] | null>(null);
  const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);

  const onPressHandler = (skill: LinkedData) => {
    database.UpdateTable(
      "Skills",
      skill.name,
      "status",
      skill.status === 1 ? 0 : 1
    );

    if (skill.name === "Perception (WIS)") {
      props.setSkillChanged(!props.skillChanged);
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const skillData = await database.GetData<SkillData>("Skills");
      const modData = await database.GetData<ModifierData>("Modifiers");

      let pBonus = await GetProficiencyBonusAsync();
      pBonus && setProficiencyBonus(pBonus);

      linkData(modData, skillData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [, props.modifiersChanged]);

  const linkData = (
    modData: ModifierData[] | null,
    skillData: SkillData[] | null
  ): void => {
    const newLinkedData: LinkedData[] =
      skillData?.map((obj) => ({
        name: obj.name,
        modifier: modData?.find((mod) => mod.name === obj.ability)?.amount,
        status: obj.status,
      })) ?? [];

    setLinkedData(newLinkedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Skills</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.rows}>
        {linkedData?.map((data, index) => (
          <View style={styles.row} key={index}>
            <TouchableOpacity onPress={() => onPressHandler(data)}>
              <Ionicons
                style={styles.button}
                name={data.status ? "radio-button-on" : "radio-button-off"}
                size={20}
              />
            </TouchableOpacity>
            <View style={styles.alignRight}>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.modifier}>
                {data.status === 1
                  ? `${
                      proficiencyBonus +
                        Math.floor(((data.modifier ?? 0) - 10) / 2) >=
                      0
                        ? `+${
                            proficiencyBonus +
                            Math.floor(((data.modifier ?? 0) - 10) / 2)
                          }`
                        : `${
                            proficiencyBonus +
                            Math.floor(((data.modifier ?? 0) - 10) / 2)
                          }`
                    }`
                  : `${
                      Math.floor(((data.modifier ?? 0) - 10) / 2) >= 0
                        ? `+${Math.floor(((data.modifier ?? 0) - 10) / 2)}`
                        : `${Math.floor(((data.modifier ?? 0) - 10) / 2)}`
                    }`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Skills;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secundary,
    flexDirection: "column",
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "90%",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 25,
    color: Colors.Darkest,
    textAlign: "right",
  },
  line: {
    borderWidth: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "44%",
  },
  name: {
    color: Colors.Darkest,
    fontFamily: "Bold",
    fontSize: 12,
    marginRight: 15,
  },
  modifier: {
    color: Colors.primary,
    fontFamily: "Regular",
    fontSize: 12,
  },
  rows: {
    flexDirection: "row",
    flex: 1,
    width: "90%",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 5,
    justifyContent: "space-between",
  },
  alignRight: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "flex-end",
  },
  button: {},
});
