import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../styles/Colors";
import { Item } from "./ItemScreen/Item";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ItemData } from "./DataInterfaces";
import { database } from "./Database";
import CoinPouch from "./ItemScreen/CoinPouch";

let heightDimension: number = Dimensions.get("window").height;

const ItemScreen = () => {
  const [items, setItems] = useState<ItemData[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let itemData = await database.GetData<ItemData>("Items");
      setItems(itemData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addItem = () => {
    database.InsertIntoTable("Items", ["name", "desc"], ["", ""]);
    fetchData();
  };

  const updateItem = (index: number, title: string, desc: string) => {
    database.UpdateTableByID("Items", index, "name", title);
    database.UpdateTableByID("Items", index, "desc", desc);
    fetchData();
  };

  const deleteItem = (index: number) => {
    database.RemoveRowByID("Items", index);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.d20ImageContainer}>
        <Image
          style={styles.d20Image}
          source={require("../assets/Image_D20.png")}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Items</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.mainContainer}>
          <View style={styles.itemContainer}>
            <ScrollView>
              {items?.map((val, index) => (
                <Item
                  key={index}
                  id={val.id}
                  title={val.name}
                  description={val.desc}
                  updateItem={updateItem}
                  deleteItem={deleteItem}
                />
              ))}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => addItem()}
              >
                <AntDesign name="plussquare" size={25}></AntDesign>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={styles.coinContainer}>
            <CoinPouch />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 80,
  },
  d20ImageContainer: {
    position: "absolute",
    flex: 1,
    width: "auto",
    height: heightDimension,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  d20Image: {
    opacity: 0.2,
    width: 200,
    height: 200,
  },
  headerContainer: {
    flexDirection: "row",
    height: 100,
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    fontFamily: "Regular",
    color: Colors.Darkest,
    textAlign: "right",
  },
  mainContainer: { flexDirection: "row" },
  itemContainer: { flex: 9 },
  coinContainer: { flex: 5 },
  buttonContainer: {
    alignItems: "flex-end",
    marginBottom: 100,
    marginVertical: 10,
  },
});
