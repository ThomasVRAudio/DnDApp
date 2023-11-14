import { View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSwipeable } from "react-swipeable";

interface SwipeableContainerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

const Container = (props: SwipeableContainerProps) => {
  return <RectButton style={styles.container}>{props.children}</RectButton>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
