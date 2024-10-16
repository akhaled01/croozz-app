import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BackgroundGeolocation from "react-native-background-geolocation";

export default function App() {
  const [speed, setSpeed] = useState(0);
  const [points, setPoints] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    // Configure background geolocation
    BackgroundGeolocation.ready(
      {
        debug: true,
        reset: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 3,
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

      // Check if the user is driving (speed > 5 m/s)
      if (currentSpeed! > 5) {
        setIsDriving(true);
      } else {
        setIsDriving(false);
      }

      // Reward points for good driving (speed < 33.33 m/s or 120 km/h)
      if (currentSpeed! > 0 && currentSpeed! <= 33.33) {
        // Award points based on speed (e.g., the faster the speed within range, the more points)
        const speedPoints = Math.floor(currentSpeed! * 2); // Example: double the speed as points
        setPoints((prevPoints) => prevPoints + speedPoints);
      }
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current Speed: {speed.toString()} m/s</Text>
      <Text>Total Points: {points}</Text>
      <Text>{isDriving ? "You are driving" : "You are not driving"}</Text>
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
