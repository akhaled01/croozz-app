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

    BackgroundGeolocation.onLocation((location) => {
      const currentSpeed = location.coords.speed;
      setSpeed(currentSpeed ?? 0);

      if (currentSpeed! > 5) {
        setIsDriving(true);
      } else {
        setIsDriving(false);
      }

      if (currentSpeed! > 0 && currentSpeed! <= 33.33) {
        const speedPoints = Math.floor(currentSpeed! * 2);
        setPoints((prevPoints) => prevPoints + speedPoints);
      }
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  const resetPoints = () => setPoints(0);

  return { speed, points, isDriving, resetPoints };
};

export default useBackgroundGeolocation;
