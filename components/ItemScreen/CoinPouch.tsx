import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";
import { useEffect, useState } from "react";
import { database } from "../Database";
import { CoinData } from "../DataInterfaces";

export interface Props {
  title: string;
  amount: number;
  updateCoins: (name: string, amount: number) => void;
}

export const CoinRow = ({ title, amount, updateCoins }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{`${title}: `}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setQuantity(parseInt(val))}
        onSubmitEditing={() => updateCoins(title, quantity)}
      >
        {amount}
      </TextInput>
    </View>
  );
};

export const CoinPouch = () => {
  const [coins, setCoins] = useState<CoinData[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data = await database.GetData<CoinData>("Coins");
      setCoins(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCoins = (name: string, amount: number) => {
    if (isNaN(amount)) amount = 0;
    database.UpdateTable("Coins", name, "amount", amount);
    fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Pouch</Text>
      <View style={styles.line}></View>
      {coins?.map((val, index) => (
        <CoinRow
          title={val.name}
          amount={val.amount}
          key={index}
          updateCoins={updateCoins}
        />
      ))}
    </View>
  );
};

export default CoinPouch;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.secundary,
    borderRadius: 10,
    elevation: 5,
    opacity: 1,
    marginHorizontal: 10,
  },
  title: {
    color: "#FFFCAA",
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 20,
  },
  line: {
    borderWidth: 1,
    width: "100%",
    alignSelf: "center",
    marginVertical: 4,
  },
  text: {
    color: Colors.primary,
    fontFamily: "Regular",
    textAlign: "left",
    fontSize: 13,
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    color: Colors.primary,
    fontFamily: "Regular",
    fontSize: 13,
  },
});
