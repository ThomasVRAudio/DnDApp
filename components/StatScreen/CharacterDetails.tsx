import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../styles/Colors";

const CharacterDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name: </Text>
        <Text style={styles.name}>Caelum</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Level</Text>
            <TextInput style={styles.info}>3</TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Race</Text>
            <TextInput style={styles.infoRight}>Eladrin</TextInput>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Background</Text>
            <TextInput style={styles.info}>Sailor</TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Class</Text>
            <TextInput style={styles.infoRight}>Bard</TextInput>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitle}>Alignment</Text>
            <TextInput style={styles.info}>Neutral Good</TextInput>
          </View>
          <View style={styles.infoSubContainer}>
            <Text style={styles.infoTitleRight}>Exp</Text>
            <TextInput style={styles.infoRight}>3124</TextInput>
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
