import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import Colors from "./styles/Colors";
import CombatScreen from "./components/CombatScreen";
import React, { StrictMode } from "react";
import StatScreen from "./components/StatScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Bold: require("./assets/fonts/Merriweather-Bold.ttf"),
    BoldItalic: require("./assets/fonts/Merriweather-BoldItalic.ttf"),
    Light: require("./assets/fonts/Merriweather-Light.ttf"),
    LightItalic: require("./assets/fonts/Merriweather-LightItalic.ttf"),
    Regular: require("./assets/fonts/Merriweather-Regular.ttf"),
  });

  const { width, height } = Dimensions.get("window");
  const totalPages = 3;

  if (!fontsLoaded) {
    return null;
  }
  function ShowScreen(index: number): React.JSX.Element {
    let window: React.JSX.Element = <View></View>;
    switch (index) {
      case 0:
        window = <CombatScreen />;
        break;
      case 1:
        window = <StatScreen />;
        break;
      default:
        window = <CombatScreen />;
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
    </StrictMode>
  );
}
