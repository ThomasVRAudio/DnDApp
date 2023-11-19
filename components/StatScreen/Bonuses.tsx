import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/Colors";
import { database } from "../Database";
import { ModifierData, SavingThrowData, SkillData } from "../DataInterfaces";
import { GetProficiencyBonusAsync } from "../../helper";

interface BonusProps {
  title: string;
  info: string | number;
}

interface StatsData {
  passivePerception: number;
  profiencyBonus: number;
  spellAttack: number;
  spellSaveDC: number;
}

const BonusBox: React.FC<BonusProps> = ({ title, info }) => (
  <View style={styles.box}>
    <Text style={styles.title}>{title}: </Text>
    <Text style={styles.info}>{info}</Text>
  </View>
);

const Bonuses: React.FC = () => {
  const [data, setData] = useState<StatsData | null>(null);

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

      let newData: StatsData = {
        profiencyBonus: profBonus,
        passivePerception: passivePerception,
        spellAttack: 0,
        spellSaveDC: 0,
      };

      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <BonusBox title="Spell Attack" info="+6" />
      <BonusBox title="Spell Save DC" info={14} />
    </View>
  );
};

export default Bonuses;

const styles = StyleSheet.create({
  container: {},
  box: {
    flex: 1,
    backgroundColor: Colors.secundary,
    flexDirection: "row",
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
});
