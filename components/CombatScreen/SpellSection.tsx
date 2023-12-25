import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SpellSlot from "./SpellSlot";
import React, { useEffect, useState } from "react";
import { SpellData, SpellDataToMap, SpellSlotData } from "../DataInterfaces";
import { SlotsDefault } from "../Data";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import AddSpellModal from "./AddSpellModal";
import Spell from "../Spell";
import SpellDescriptionModal from "./SpellDescriptionModal";
import { database } from "../Database";

const SpellSection = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [spells, setSpells] = useState<SpellDataToMap[] | null>(null);
  const [showSpellDescriptionModal, setShowSpellDescriptionModal] =
    useState<boolean>(false);
  const [spellDescription, setSpellDescription] =
    useState<SpellDataToMap | null>(null);
  const [spellSlotData, setSpellSlotData] = useState<SpellSlotData[] | null>(
    null
  );

  function SubtractSlotAmount(name: string) {
    database.UpdateTable(
      "SpellSlots",
      name,
      "amount",
      (spellSlotData?.find((d) => d.name === name)?.amount ?? 0) - 1
    );
    fetchData();
  }

  const ResetSlotsToMax = () => {
    spellSlotData?.forEach((s) => {
      database.UpdateTable("SpellSlots", s.name, "amount", s.max);
      fetchData();
    });
  };

  const SetMaxAmount = (name: string, maxValue: number) => {
    database.UpdateTable("SpellSlots", name, "max", maxValue);
    fetchData();
  };

  const ShowSpellDescription = (data: SpellDataToMap) => {
    setShowSpellDescriptionModal(true);
    setSpellDescription(data);
  };

  const SaveSpell = (data: SpellData) => {
    const columns: string[] = [
      "name",
      "desc",
      "higher_level",
      "components",
      "duration",
      "level",
      "range",
      "casting_time",
      "school",
    ];
    const values: string[] = [
      data.name,
      data.desc ? data.desc.join("") : "",
      data.higher_level ? data.higher_level.join("") : "",
      data.components ? data.components.join("") : "",
      data.duration,
      data.level,
      data.range,
      data.casting_time,
      data.school.name,
    ];
    database.InsertIntoTable("Spells", columns, values);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const fetchedSpellSlotData = await database.GetData<SpellSlotData>(
        "SpellSlots"
      );

      const fetchedSpellData = await database.GetData<SpellDataToMap>("Spells");

      setSpellSlotData(fetchedSpellSlotData);
      setSpells(fetchedSpellData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //database.ShowAllTables();
    //database.DropTable("SpellSlots");
    //database.CreateTables();
    // slots.forEach((s, index) => {
    //   database.InsertIntoTable(
    //     "SpellSlots",
    //     ["name", "amount", "max", "level"],
    //     [`Level ${index + 1} `, 0, 0, index + 1]
    //   );
    // });

    // for (let i = 0; i < 9; i++) {
    //   database.InsertIntoTable(
    //     "SpellSlots",
    //     ["name", "amount", "max", "level"],
    //     [`Level ${i + 1} `, 0, 0, i + 1]
    //   );
    // }
    //database.DropTable("Spells");
    //database.ShowTableContent("Spells");
    fetchData();
  }, []);

  const removeSpell = async (name: string) => {
    try {
      await database.RemoveRow("Spells", name);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spells</Text>
      </View>
      <View style={styles.slotContainer}>
        {spellSlotData?.map((item, index) => (
          <SpellSlot
            key={index}
            amount={item.amount}
            level={item.level}
            max={item.max}
            name={item.name}
            subtractSlot={SubtractSlotAmount}
            setMaxAmount={SetMaxAmount}
          />
        ))}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => ResetSlotsToMax()}>
            <Ionicons name="reload" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModal(!modal)}>
            <AntDesign name="plussquare" size={25}></AntDesign>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {modal ? (
          <AddSpellModal setModal={setModal} saveSpell={SaveSpell} />
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.spellHeader}>
        <Text style={styles.spellHeaderTitle}>Traits</Text>
      </View>
      <View style={styles.spellContainer}></View>
      <View style={styles.spellHeader}>
        <Text style={styles.spellHeaderTitle}>Cantrips</Text>
      </View>
      <View style={styles.spellContainer}>
        {spells
          ?.filter((spell) => parseInt(spell.level) === 0)
          .map((spell, index) => (
            <Spell
              data={spell}
              key={index}
              showSpellDescription={ShowSpellDescription}
            />
          ))}
      </View>
      <View style={styles.spellHeader}>
        <Text style={styles.spellHeaderTitle}>Levels</Text>
      </View>
      <View style={styles.spellContainer}>
        {spells
          ?.filter((spell) => parseInt(spell.level) !== 0)
          .map((spell, index) => (
            <Spell
              data={spell}
              key={index}
              showSpellDescription={ShowSpellDescription}
            />
          ))}
      </View>
      <View>
        {showSpellDescriptionModal ? (
          <SpellDescriptionModal
            setModal={setShowSpellDescriptionModal}
            data={spellDescription}
            removeSpell={removeSpell}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
};

export default SpellSection;

const styles = StyleSheet.create({
  container: {},
  slotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontFamily: "Regular",
    color: Colors.Darkest,
    fontSize: 30,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 40,
    height: 80,
  },
  spellHeader: {},
  spellHeaderTitle: {
    fontFamily: "Regular",
    fontSize: 20,
    textAlign: "right",
  },
  spellContainer: {
    flexDirection: "row",
    columnGap: 20,
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
