import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { database } from "../Database";
import {
  ModifierData,
  SavingThrowData,
  SkillData,
  StatsModData,
} from "../DataInterfaces";
import { GetProficiencyBonusAsync } from "../../helper";
import SelectDropdown from "react-native-select-dropdown";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface BonusProps {
  title: string;
  info: string | number;
}

interface BonusPropsModifier {
  title: string;
  info: number;
  modifiersChanged: boolean;
}

interface Props {
  modifiersChanged: boolean;
}

interface StatsData {
  passivePerception: number;
  profiencyBonus: number;
  spellAttack: number;
  spellSaveDC: number;
}

const BonusBox: React.FC<BonusProps> = ({ title, info }) => (
  <View style={styles.box}>
    <View style={styles.mainDetails}>
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  </View>
);

const BonusBoxWithModifier: React.FC<BonusPropsModifier> = ({
  title,
  info,
  modifiersChanged,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modifier, setModifier] = useState<string>("");
  const [bonus, setBonus] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, [, modifiersChanged]);

  const fetchData = async () => {
    try {
      const stats = await database.GetData<StatsModData>(`Stats`);
      const modData = await database.GetData<ModifierData>("Modifiers");

      let mod = stats?.find((d) => d.name === title)?.modifier;
      setModifier(mod ?? "Charisma");

      let modBonus = Math.floor(
        ((modData?.find((d) => d.name === mod)?.amount ?? 0) - 10) / 2
      );
      setBonus(modBonus);
    } catch (error) {}
  };

  const selectAbility = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  const setCustomModifier = (modifier: string) => {
    database.UpdateTable("Stats", title, "modifier", modifier);
    setModifier(modifier);
    fetchData();
  };

  return (
    <TouchableOpacity
      style={[styles.box, { height: isOpen ? 100 : 50 }]}
      onPress={() => setIsOpen(!isOpen)}
    >
      <View style={styles.mainDetails}>
        <Text style={styles.title}>{title}: </Text>
        <Text style={styles.info}>{`+${info + bonus}`}</Text>
      </View>
      {isOpen ? (
        <View style={styles.extension}>
          <View style={styles.modifierSection}>
            <Text style={styles.extensionText}>Ability Modifier: </Text>
            <SelectDropdown
              renderDropdownIcon={() => <Ionicons name="caret-down"></Ionicons>}
              buttonStyle={styles.dropDown}
              buttonTextStyle={styles.dropDownText}
              dropdownStyle={styles.dropDownOpen}
              rowTextStyle={styles.dropDownOpenText}
              data={selectAbility}
              defaultValue={modifier}
              showsVerticalScrollIndicator={false}
              onSelect={(selectedItem) => {
                setCustomModifier(String(selectedItem));
              }}
            />
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};

const Bonuses: React.FC<Props> = (props: Props) => {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    // if (modifier === "") setModifier("Charisma");
    //database.RemoveAllRows("Stats");
    //return;
    //database.CreateTables();
    // database.InsertIntoTable(
    //   "Stats",
    //   ["name", "modifier"],
    //   ["Spell Attack", "Charisma"]
    // );
    // database.InsertIntoTable(
    //   "Stats",
    //   ["name", "modifier"],
    //   ["Spell Save DC", "Charisma"]
    // );
    //fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const saveData = await database.GetData<SavingThrowData>("SavingThrows");
      const skillData = await database.GetData<SkillData>("Skills");
      const modData = await database.GetData<ModifierData>("Modifiers");

      const perceptionSkill = skillData?.find(
        (d) => d.name === "Perception (WIS)" && d.status === 1
      );
      const perceptionMod = modData
        ? Math.floor(
            ((modData?.find((d) => d.name === "Wisdom")?.amount || 0) - 10) / 2
          )
        : 0;

      let profBonus = await GetProficiencyBonusAsync();

      const passivePerception = perceptionSkill
        ? 10 + (perceptionMod ?? 0) + profBonus
        : 10 + (perceptionMod ?? 0);

      let spellSave = 8 + profBonus;
      let spellAtk = profBonus;

      let newData: StatsData = {
        profiencyBonus: profBonus,
        passivePerception: passivePerception,
        spellAttack: spellAtk,
        spellSaveDC: spellSave,
      };

      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [, props.modifiersChanged]);

  return (
    <View style={styles.container}>
      <BonusBox
        title="Passive Perception"
        info={data?.passivePerception || 0}
      />
      <BonusBox
        title="Proficiency Bonus"
        info={`+${data?.profiencyBonus || 0}`}
      />
      <BonusBoxWithModifier
        title="Spell Attack"
        info={data?.spellAttack || 0}
        modifiersChanged={props.modifiersChanged}
      />
      <BonusBoxWithModifier
        title="Spell Save DC"
        info={data?.spellSaveDC || 0}
        modifiersChanged={props.modifiersChanged}
      />
    </View>
  );
};

export default Bonuses;

const styles = StyleSheet.create({
  container: {},
  box: {
    backgroundColor: Colors.secundary,
    borderRadius: 7,
    padding: 15,
    width: 240,
    marginBottom: 10,
  },
  title: {
    color: Colors.primary,
    fontFamily: "Bold",
    textAlign: "left",
  },
  info: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "left",
  },
  extensionText: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "LightItalic",
    textAlign: "left",
    fontSize: 12,
    flex: 1,
    padding: 6,
  },
  modifier: {
    flexDirection: "row",
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  modifierSection: {
    flexDirection: "row",
    flex: 7,
  },
  dropDown: {
    flex: 2,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  dropDownText: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
  },
  dropDownOpen: {
    flex: 1,
    borderRadius: 10,
    padding: 6,
    borderWidth: 2,
    backgroundColor: Colors.Tertiary,
  },
  dropDownOpenText: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "center",
    fontSize: 12,
  },
  extension: {
    paddingTop: 4,
    height: 50,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  mainDetails: {
    flexDirection: "row",
  },
});
