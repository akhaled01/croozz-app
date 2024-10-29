import React from "react";
import { Text } from "react-native";

const Speed = ({ speed }: { speed: number }) => (
  <Text>Current Speed: {speed.toString()} m/s</Text>
);

export default Speed;
