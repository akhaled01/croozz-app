import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";

export default function App() {
  const [speed, setSpeed] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Configure background geolocation
    BackgroundGeolocation.ready(
      {
        debug: true,
        reset: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopOnTerminate: false,
        startOnBoot: true,
        foregroundService: true,
      },
      (state) => {
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      }
    );

    // Listen for location updates
    BackgroundGeolocation.onLocation((location) => {
      const currentSpeed = location.coords.speed; // Speed in meters/second
      setSpeed(currentSpeed ?? 0);
      if (currentSpeed! > 10) {
        setPoints((prevPoints) => prevPoints + 10);
      }
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current Speed: {speed.toFixed(2)} m/s</Text>
      <Text>Total Points: {points}</Text>
      <Button title="Reset Points" onPress={() => setPoints(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
