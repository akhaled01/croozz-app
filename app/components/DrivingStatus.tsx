import React from "react";
import { Text } from "react-native";

const DrivingStatus = ({ isDriving }: { isDriving: boolean }) => (
  <Text>{isDriving ? "You are driving" : "You are not driving"}</Text>
);

export default DrivingStatus;
