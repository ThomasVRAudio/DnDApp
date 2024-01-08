import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Touchable,
} from "react-native";
import { SpellData, SpellDataToMap } from "../DataInterfaces";
import Colors from "../../styles/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  setModal: (on: boolean) => void;
  data: SpellDataToMap | null;
  removeSpell: (name: string) => void;
}

const SpellDescriptionModal = (props: Props) => {
  return (
    <View>
      <Modal transparent={true}>
        <View style={styles.modalContainer}>
          <View
            onTouchEnd={() => props.setModal(false)}
            style={styles.modalContent}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <Text style={styles.title}>{props.data?.name}</Text>
                {props.data?.level !== null &&
                props.data?.level !== undefined ? (
                  parseInt(props.data?.level) === 0 ? (
                    <Text style={styles.level}>Cantrip</Text>
                  ) : props.data?.level === "Trait" ? (
                    <Text style={styles.level}>{props.data?.level}</Text>
                  ) : (
                    <Text style={styles.level}>
                      Level {parseFloat(props.data?.level)}
                    </Text>
                  )
                ) : null}
              </View>
              <View style={styles.line}></View>
              <View style={styles.infoContainer}>
                <View style={styles.infoLine}>
                  <Text style={styles.infoTitle}>Casting Time: </Text>
                  <Text style={styles.infoData}>
                    {props.data?.casting_time}
                  </Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoTitle}>Range: </Text>
                  <Text style={styles.infoData}>{props.data?.range}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoTitle}>Components: </Text>
                  <Text style={styles.infoData}>{props.data?.components}</Text>
                </View>
                <View style={styles.infoLine}>
                  <Text style={styles.infoTitle}>Duration: </Text>
                  <Text style={styles.infoData}>{props.data?.duration}</Text>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  {props.data?.desc.length !== undefined ||
                  props.data?.desc.length !== 0
                    ? props.data?.desc.replace(/\. /g, ".\n\n")
                    : null}
                </Text>
              </View>
            </ScrollView>
            <View style={styles.removeContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.removeSpell(props.data?.name ?? "null");
                  props.setModal(false);
                }}
              >
                <Ionicons style={styles.removeButton} name="trash" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SpellDescriptionModal;

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: Colors.primary,
    flex: 0.8,
    width: "80%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    opacity: 1,
  },
  line: {
    height: 1,
    backgroundColor: Colors.Highlight,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 20,
    color: Colors.Tertiary,
    flex: 1,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    paddingTop: 10,
  },
  level: {
    fontFamily: "Regular",
    fontSize: 18,
    color: Colors.Tertiary,
    flex: 1,
    textAlign: "center",
  },
  infoTitle: {
    fontFamily: "Bold",
    fontSize: 15,
  },
  infoData: {
    fontFamily: "Regular",
    fontSize: 15,
  },
  infoLine: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  infoContainer: {
    width: "80%",
    alignSelf: "center",
  },
  descriptionContainer: {
    paddingTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  description: {
    fontFamily: "Regular",
    textAlign: "justify",
  },
  removeButton: {
    alignItems: "flex-end",
  },
  removeContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
