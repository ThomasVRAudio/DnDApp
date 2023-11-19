import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SpellSlot from "./SpellSlot";
import React, { useEffect, useState } from "react";
import { SpellData, SpellSlotData } from "../DataInterfaces";
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
  const [spells, setSpells] = useState<SpellData[] | null>(null);
  const [showSpellDescriptionModal, setShowSpellDescriptionModal] =
    useState<boolean>(false);
  const [spellDescription, setSpellDescription] = useState<SpellData | null>(
    null
  );
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

  const ShowSpellDescription = (data: SpellData) => {
    setShowSpellDescriptionModal(true);
    setSpellDescription(data);
  };

  const fetchData = async () => {
    try {
      const fetchedData = await database.GetData<SpellSlotData>("SpellSlots");
      setSpellSlotData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

    fetchData();
  }, []);

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
          <AddSpellModal
            setModal={setModal}
            setSpells={setSpells}
            spell={spells}
          />
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
