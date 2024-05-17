import { Text, Pressable, GestureResponderEvent, useWindowDimensions } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme"
import { generateBookingStyles } from "./styles";

interface _ITabItem {
  label: string;
  isSelected: boolean;
  num_tabs: number;
  onPress: (tab: GestureResponderEvent) => void;
}

  const calculateTabItemWidth = (numItems: number, screenWidth: number, minWidth = 100) => {
    // Consider available space after margins (assuming equal margins on both sides)
    const usableWidth = screenWidth - 2 * 10; // Adjust margin value as needed

    // Calculate ideal width based on number of items
    const idealWidth = usableWidth / numItems;

    // Ensure minimum width is met
    return Math.max(idealWidth, minWidth);
};
  
const TabItem = ({ label, num_tabs, isSelected, onPress }: _ITabItem) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = generateBookingStyles(colorScheme);
  const screenWidth = useWindowDimensions().width; // Get screen width from Expo
  const tabWidth = calculateTabItemWidth(num_tabs, screenWidth); // Replace with actual number of tabs
  return (
    <Pressable onPress={onPress} style={{ width: tabWidth, ...styles.tabItem }}>
      <Text
        style={[
          { padding: 10, textAlign: "center", borderRadius: 10, },
          isSelected ? styles.tabItemTextActive : styles.tabItemText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabItem;