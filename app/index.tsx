import React from "react";
import { View, Button } from "react-native";
import Speed from "./components/Speed";
import Points from "./components/Points";
import DrivingStatus from "./components/DrivingStatus";
import useBackgroundGeolocation from "./hooks/useBackgroundGeolocation";
import styles from "./styles/styles";

export default function App() {
  const { speed, points, isDriving, resetPoints } = useBackgroundGeolocation();

  return (
    <View style={styles.container}>
      <Speed speed={speed} />
      <Points points={points} />
      <DrivingStatus isDriving={isDriving} />
      <Button title="Reset Points" onPress={resetPoints} />
    </View>
  );
}
