import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import useBackgroundGeolocation from "../hooks/useBackgroundGeolocation";

const DrivingStatus = ({
  isDarkMode,
}: {
  isDriving: boolean;
  isDarkMode: boolean;
}) => {
  const drivingColor = "#34C759"; // iOS green color
  const notDrivingColor = isDarkMode ? "#FFFFFF" : "#000000";
  const { isDriving } = useBackgroundGeolocation();

  return (
    <View
      style={[
        styles.statusContainer,
        isDarkMode ? styles.darkStatusContainer : styles.lightStatusContainer,
      ]}
    >
      <Text
        style={[
          styles.statusText,
          isDarkMode ? styles.darkText : styles.lightText,
          { color: isDriving ? drivingColor : notDrivingColor },
        ]}
      >
        {isDriving ? "Driving" : "Not Driving"}
      </Text>
    </View>
  );
};

export default DrivingStatus;
