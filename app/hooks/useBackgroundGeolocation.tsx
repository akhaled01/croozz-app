import { useEffect, useState } from "react";
import BackgroundGeolocation from "react-native-background-geolocation";

const useBackgroundGeolocation = () => {
  const [speed, setSpeed] = useState(0);
  const [points, setPoints] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    BackgroundGeolocation.ready(
      {
        debug: true,
        reset: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 1,
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

    BackgroundGeolocation.onLocation((location) => {
      const currentSpeed = location.coords.speed! * 3.6; // Convert from m/s to km/h
      setSpeed(currentSpeed ?? 0);

      if (currentSpeed < 0) {
        setSpeed(0);
      }

      if (currentSpeed > 5) {
        setIsDriving(true);
      } else {
        setIsDriving(false);
      }

      // Points logic based on speed
      let speedPoints = 0;
      if (currentSpeed > 20 && currentSpeed <= 40) {
        speedPoints = 1.5;
      } else if (currentSpeed > 40 && currentSpeed <= 60) {
        speedPoints = 1.3;
      } else if (currentSpeed > 60 && currentSpeed <= 80) {
        speedPoints = 1.1;
      } else if (currentSpeed > 80 && currentSpeed <= 100) {
        speedPoints = 0.9;
      } else if (currentSpeed > 100 && currentSpeed <= 120) {
        speedPoints = 0.7;
      } else if (currentSpeed > 120 && currentSpeed <= 130) {
        speedPoints = 0.3;
      } else if (currentSpeed > 130 && currentSpeed <= 140) {
        speedPoints = -0.1;
      } else if (currentSpeed > 140 && currentSpeed <= 150) {
        speedPoints = -0.5;
      } else if (currentSpeed > 150 && currentSpeed <= 160) {
        speedPoints = -0.9;
      } else if (currentSpeed > 160) {
        speedPoints = -1.3;
      }

      setPoints((prevPoints) => prevPoints + speedPoints);
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  const resetPoints = () => setPoints(0);

  return { speed, points, isDriving, resetPoints };
};

export default useBackgroundGeolocation;
