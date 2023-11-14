import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import CharacterDetails from "./StatScreen/CharacterDetails";
import Bonuses from "./StatScreen/Bonuses";
import AbilityModifiers from "./StatScreen/AbilityModifiers";
import SavingThrows from "./StatScreen/SavingThrows";
import Skills from "./StatScreen/Skills";

let heightDimension: number = Dimensions.get("window").height;

const StatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.d20ImageContainer}>
        <Image
          style={styles.d20Image}
          source={require("../assets/Image_D20.png")}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Character Info & Stats</Text>
      </View>
      <View style={styles.primarySection}>
        <CharacterDetails />
        <Bonuses />
      </View>
      <View style={styles.header}>
        <Text style={styles.subheaderText}>Ability Modifiers</Text>
      </View>
      <View style={styles.secundarySection}>
        <AbilityModifiers />
        <SavingThrows />
      </View>
      <View style={styles.lastSection}>
        <Skills />
      </View>
    </View>
  );
};

export default StatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 80,
  },
  header: {
    paddingBottom: 20,
  },
  headerText: {
    textAlign: "right",
    fontFamily: "Regular",
    fontSize: 22,
  },
  subheaderText: {
    textAlign: "left",
    fontFamily: "Regular",
    fontSize: 22,
  },
  primarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  d20ImageContainer: {
    position: "absolute",
    flex: 1,
    width: "auto",
    height: heightDimension - 75,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  d20Image: {
    opacity: 0.2,
    width: 200,
    height: 200,
  },
  secundarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 250,
    marginBottom: 30,
  },
  lastSection: {
    height: 350,
  },
});