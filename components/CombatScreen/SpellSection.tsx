import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SpellSlot from "./SpellSlot";
import React, { useState } from "react";
import { SpellData, SpellSlotData } from "../DataInterfaces";
import { SlotsDefault } from "../Data";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import AddSpellModal from "./AddSpellModal";
import Spell from "../Spell";
import SpellDescriptionModal from "./SpellDescriptionModal";

const SpellSection = () => {
  const [slots, setSlots] = useState<SpellSlotData[]>(SlotsDefault);
  const [modal, setModal] = useState<boolean>(false);
  const [spells, setSpells] = useState<SpellData[] | null>(null);
  const [showSpellDescriptionModal, setShowSpellDescriptionModal] =
    useState<boolean>(false);
  const [spellDescription, setSpellDescription] = useState<SpellData | null>(
    null
  );

  function SubtractSlotAmount(level: number) {
    const updatedSlots: SpellSlotData[] = slots.map((item) =>
      item.level === level
        ? { ...item, amount: Math.max(item.amount - 1, 0) }
        : item
    );
    setSlots(updatedSlots);
  }

  const ResetSlotsToMax = () => {
    let updatedSlots: SpellSlotData[] = slots.map((item) => ({
      ...item,
      amount: item.max,
    }));

    setSlots(updatedSlots);
  };

  const SetMaxAmount = (level: number, maxValue: number) => {
    let updatedSlots: SpellSlotData[] = slots.map((item) =>
      item.level === level
        ? {
            ...item,
            max: maxValue,
          }
        : item
    );

    setSlots(updatedSlots);
  };

  const ShowSpellDescription = (data: SpellData) => {
    setShowSpellDescriptionModal(true);
    setSpellDescription(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spells</Text>
      </View>
      <View style={styles.slotContainer}>
        {slots.map((item, index) => (
          <SpellSlot
            key={index}
            amount={item.amount}
            level={item.level}
            max={item.max}
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
