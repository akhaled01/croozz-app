import React, { useEffect, useRef } from "react";
import { Easing, View, Text, Animated } from "react-native";
import { styles } from "../styles/styles";
import useBackgroundGeolocation from "../hooks/useBackgroundGeolocation";

const Odometer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { points } = useBackgroundGeolocation();
  const digits = points.toString().padStart(6, "0").split("");
  const animatedValues = useRef(
    digits.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    digits.forEach((digit, index) => {
      Animated.timing(animatedValues[index], {
        toValue: -60 * parseInt(digit),
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [points]);

  return (
    <View
      style={[
        styles.odometerContainer,
        isDarkMode
          ? styles.darkOdometerContainer
          : styles.lightOdometerContainer,
      ]}
    >
      {digits.map((_digit, index) => (
        <View
          key={index}
          style={[
            styles.digitContainer,
            isDarkMode
              ? styles.darkOdometerContainer
              : styles.lightOdometerContainer,
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: animatedValues[index] }],
            }}
          >
            {[...Array(10)].map((_, i) => (
              <Text
                key={i}
                style={[
                  styles.digit,
                  isDarkMode ? styles.darkDigit : styles.lightDigit,
                ]}
              >
                {i}
              </Text>
            ))}
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

export default Odometer;
