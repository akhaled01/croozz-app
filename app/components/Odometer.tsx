import { Easing, View, Text } from "react-native";
import { styles } from "../styles/styles";
import { MotiView } from "moti";
import useBackgroundGeolocation from "../hooks/useBackgroundGeolocation";

const Odometer = ({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) => {
  const { points } = useBackgroundGeolocation();
  const digits = points.toString().padStart(6, "0").split("");

  return (
    <View
      style={[
        styles.odometerContainer,
        isDarkMode
          ? styles.darkOdometerContainer
          : styles.lightOdometerContainer,
      ]}
    >
      {digits.map((digit, index) => (
        <View
          key={index}
          style={[
            styles.digitContainer,
            isDarkMode
              ? styles.darkOdometerContainer
              : styles.lightOdometerContainer,
          ]}
        >
          <MotiView
            from={{ translateY: 0 }}
            animate={{ translateY: -60 * parseInt(digit) }}
            transition={{
              type: "timing",
              duration: 500,
              easing: Easing.out(Easing.ease),
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
          </MotiView>
        </View>
      ))}
    </View>
  );
};

export default Odometer;
