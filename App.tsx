import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import Colors from "./styles/Colors";
import CombatScreen from "./components/CombatScreen";
import React, { StrictMode, useEffect, useState } from "react";
import StatScreen from "./components/StatScreen";
import { database } from "./components/database";
import ItemScreen from "./components/ItemScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/Merriweather-Bold.ttf"),
    BoldItalic: require("./assets/fonts/Merriweather-BoldItalic.ttf"),
    Light: require("./assets/fonts/Merriweather-Light.ttf"),
    LightItalic: require("./assets/fonts/Merriweather-LightItalic.ttf"),
    Regular: require("./assets/fonts/Merriweather-Regular.ttf"),
  });

  const [modifiersChanged, setModifiersChanged] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    checkInit();
  }, []);

  const checkInit = async () => {
    try {
      let init = await database.InitializeDatabase();
      setInitialized(init);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const { width, height } = Dimensions.get("window");
  const totalPages = 3;

  if (!fontsLoaded) {
    return null;
  }
  function ShowScreen(index: number): React.JSX.Element {
    let window: React.JSX.Element = <View></View>;
    switch (index) {
      case 0:
        window = <CombatScreen modifiersChanged={modifiersChanged} />;
        break;
      case 1:
        window = (
          <StatScreen
            setModifiersChanged={setModifiersChanged}
            modifiersChanged={modifiersChanged}
          />
        );
        break;
      case 2:
        window = <ItemScreen />;
        break;
    }
    return window;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      width: width,
      height: height,
    },
  });

  return (
    <StrictMode>
      {initialized ? (
        <View style={styles.container}>
          <FlatList
            data={[...Array(totalPages).keys()]}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            initialNumToRender={totalPages}
            renderItem={({ item }) => (
              <View style={styles.container}>{ShowScreen(item)}</View>
            )}
          />
          <StatusBar style="auto" />
        </View>
      ) : (
        <View></View>
      )}
    </StrictMode>
  );
}
