import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import DrivingStatus from "./components/DrivingStatus";
import Odometer from "./components/Odometer";
import { styles } from "./styles/styles";
import Speed from "./components/Speed";
import { Drawer } from "./components/Drawer";
import useBackgroundGeolocation from "./hooks/useBackgroundGeolocation";

const Page = () => {
  const { isDriving } = useBackgroundGeolocation();
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");
  const { Component: DrawerComponent, Trigger: openDrawer } = Drawer({
    isDarkMode,
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
      onLayout={onLayoutRootView}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.profileButton}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={isDarkMode ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
        <Text
          style={[styles.logo, isDarkMode ? styles.darkLogo : styles.lightLogo]}
        >
          CROOZZ
        </Text>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={isDarkMode ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Odometer isDarkMode={isDarkMode} />
        <Speed isDarkMode={isDarkMode} />
        <DrivingStatus isDriving={isDriving} isDarkMode={isDarkMode} />
      </View>
      <DrawerComponent />
    </SafeAreaView>
  );
};

export default Page;
