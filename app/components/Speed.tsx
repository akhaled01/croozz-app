import React from "react";
import { Text, View } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { styles } from "../styles/styles";
import useBackgroundGeolocation from "../hooks/useBackgroundGeolocation";

const Speed = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { speed } = useBackgroundGeolocation();
  return (
    <View style={styles.speedContainer}>
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r="80"
          stroke="#FF3B30"
          strokeWidth="10"
          fill="none"
        />
      </Svg>
      <View style={styles.speedTextContainer}>
        <Text
          style={[
            styles.speedText,
            isDarkMode ? styles.darkText : styles.lightText,
          ]}
        >
          {Math.round(speed)}
        </Text>
        <Text style={styles.speedUnit}>km/h</Text>
      </View>
    </View>
  );
};

export default Speed;
