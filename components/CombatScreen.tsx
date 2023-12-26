import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import UpperStat from "./CombatScreen/UpperStat";
import Colors from "../styles/Colors";
import HitPoints from "./CombatScreen/HitPoints";
import Equipment from "./CombatScreen/Equipment";
import Weapon from "./CombatScreen/Weapon";
import Armor from "./CombatScreen/Armor";
import SpellSection from "./CombatScreen/SpellSection";
import ACInitSpeed from "./CombatScreen/ACInitSpeed";
import { useEffect, useState } from "react";
import Armorset from "./CombatScreen/Armorset";

let heightDimension: number = Dimensions.get("window").height;

export default function CombatScreen() {
  const [armorClass, setArmorClass] = useState<number>(0);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.d20ImageContainer}>
          <Image
            style={styles.d20Image}
            source={require("../assets/Image_D20.png")}
          />
        </View>
        <View style={styles.headerContainer}>
          <ACInitSpeed AC={armorClass} />
          <View style={styles.headerContainerRight}>
            <Text style={styles.upperTitle}>Weapons</Text>
          </View>
        </View>
        <View style={styles.upperContainer}>
          <View style={styles.hitPointsContainer}>
            <HitPoints />
          </View>
          <View style={styles.gearContainer}>
            <View style={styles.weaponContainer}>
              <Equipment equipment_type={"Weapon"} />
            </View>
            <View style={styles.headerContainerArmor}>
              <Text style={styles.upperTitle}>Armor</Text>
            </View>
            <View style={styles.weaponContainer}>
              <Armorset setArmorClass={setArmorClass} />
            </View>
          </View>
        </View>
        <View style={styles.spellslotContainer}>
          <SpellSection />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
  },
  headerContainer: {
    flexDirection: "row",
    height: 100,
    marginBottom: 20,
  },
  headerContainerRight: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  headerContainerArmor: {
    alignItems: "flex-end",
  },
  headerContainerSpells: {
    alignItems: "center",
    marginBottom: 10,
  },
  upperTitle: {
    fontSize: 27,
    fontFamily: "Regular",
    color: Colors.Darkest,
  },
  upperContainer: {
    flexDirection: "row",
    height: 550,
  },
  hitPointsContainer: {
    flex: 1,
  },
  gearContainer: {
    flex: 1,
  },
  d20ImageContainer: {
    position: "absolute",
    flex: 1,
    width: "auto",
    height: heightDimension - 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  d20Image: {
    opacity: 0.2,
    width: 200,
    height: 200,
  },
  weaponContainer: {
    flex: 1,
  },
  spellslotContainer: {
    //height: 1000,
  },
  scrollContainer: {},
});
