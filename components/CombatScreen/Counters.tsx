import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Colors from "../../styles/Colors";
import Counter from "./Counter";
import { database } from "../database";
import { useEffect, useState } from "react";
import { CounterData } from "../DataInterfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

const Counters = () => {
  const [counters, setCounters] = useState<CounterData[] | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  function SubtractSlotAmount(id: number) {
    database.UpdateTableByID(
      "Counters",
      id,
      "amount",
      (counters?.find((d) => d.id === id)?.amount ?? 0) - 1
    );
    fetchData();
  }

  const ResetSlotsToMax = () => {
    counters?.forEach((s) => {
      database.UpdateTableByID("Counters", s.id, "amount", s.max);
      fetchData();
    });
  };

  const SetMaxAmount = (id: number, maxValue: number) => {
    database.UpdateTableByID("Counters", id, "max", maxValue);
    fetchData();
  };

  const SetTitle = (id: number, name: string) => {
    database.UpdateTableByID("Counters", id, "name", name);
    fetchData();
  };
  const RemoveCounter = (id: number) => {
    database.RemoveRowByID("Counters", id);
    fetchData();
  };

  const AddCounter = () => {
    database.InsertIntoTable(
      "Counters",
      ["name", "amount", "max"],
      ["Custom", 0, 0]
    );
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let counterData = await database.GetData<CounterData>("Counters");
      setCounters(counterData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Counters</Text>
      <View style={styles.slotContainer}>
        {counters?.map((val, index) => (
          <Counter
            amount={val.amount}
            max={val.max}
            name={val.name}
            setMaxAmount={SetMaxAmount}
            subtractSlot={SubtractSlotAmount}
            deleteItem={RemoveCounter}
            setTitle={SetTitle}
            id={val.id}
            key={index}
            editMode={editMode}
          />
        ))}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => ResetSlotsToMax()}
          >
            <Ionicons name="reload" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => AddCounter()}>
            <AntDesign name="plussquare" size={25}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditMode(!editMode)}
          >
            <Ionicons
              name="create-outline"
              size={25}
              style={{ color: editMode ? Colors.Highlight : Colors.Darkest }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Counters;

const styles = StyleSheet.create({
  container: {},
  slotContainer: {
    flexDirection: "row",
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: 40,
    height: 120,
  },
  button: {
    padding: 10,
  },
});
