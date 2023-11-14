import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import UpperStat from "./CombatScreen/UpperStat";
import Colors from "../styles/Colors";
import HitPoints from "./CombatScreen/HitPoints";
import Equipment from "./CombatScreen/Equipment";
import Weapon from "./CombatScreen/Weapon";
import Armor from "./CombatScreen/Armor";
import SpellSection from "./CombatScreen/SpellSection";

let heightDimension: number = Dimensions.get("window").height;

export default function CombatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.d20ImageContainer}>
        <Image
          style={styles.d20Image}
          source={require("../assets/Image_D20.png")}
        />
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainerLeft}>
          <UpperStat name={"Armor Class"} number={4} isSharp={true} />
          <UpperStat name={"Initiative"} number={3} isSharp={false} />
          <UpperStat name={"Speed"} number={30} isSharp={false} />
        </View>
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
            <Equipment
              equipment_type={"Weapon"}
              element={<Weapon equipment={null} />}
            />
          </View>
          <View style={styles.headerContainerArmor}>
            <Text style={styles.upperTitle}>Armor</Text>
          </View>
          <View style={styles.weaponContainer}>
            <Equipment
              equipment_type={"Armor"}
              element={<Armor equipment={null} />}
            />
          </View>
        </View>
      </View>
      <View style={styles.spellslotContainer}>
        <SpellSection />
      </View>
    </View>
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
  headerContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
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
    height: 170,
  },
  spellslotContainer: {
    height: 100,
  },
});
