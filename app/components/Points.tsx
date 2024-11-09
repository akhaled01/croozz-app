import React from "react";
import { Text } from "react-native";
import useBackgroundGeolocation from "../hooks/useBackgroundGeolocation";

const Points = () => {
  const { points } = useBackgroundGeolocation();

  return <Text>Total Points: {points}</Text>;
};

export default Points;
