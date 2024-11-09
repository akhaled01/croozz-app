"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Platform,
  Modal,
  Animated,
  Pressable,
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

export default function Component() {
  const [points, setPoints] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isDriving, setIsDriving] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-300)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  const resetPoints = () => setPoints(0);

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

  const toggleDriving = () => {
    setIsDriving(!isDriving);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.spring(drawerAnimation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 14,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.spring(drawerAnimation, {
        toValue: -300,
        useNativeDriver: true,
        bounciness: 0,
        speed: 14,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setIsDrawerOpen(false));
  };

  const DrawerContent = () => (
    <>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnimation,
          },
        ]}
      >
        <Pressable style={styles.overlayPressable} onPress={closeDrawer} />
      </Animated.View>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerAnimation }],
          },
          isDarkMode ? styles.darkDrawer : styles.lightDrawer,
        ]}
      >
        <View style={styles.drawerHeader}>
          <Text
            style={[
              styles.drawerTitle,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}
          >
            Profile
          </Text>
          <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
            <Ionicons
              name="close"
              size={24}
              color={isDarkMode ? "#FFF" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );

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
        {/* <Text style={[styles.statusText, isDarkMode ? styles.darkText : styles.lightText]}>Testing Functions</Text>
        <View style={styles.buttonContainer}>
          <Button title="Reset Points" onPress={resetPoints} color="#FF3B30" />
          <Button title="Add Points" onPress={() => setPoints(points + 1)} color="#FF3B30" />
          <Button title="Add Speed" onPress={() => setSpeed(speed + 1)} color="#FF3B30" />
          <Button title="Reset Speed" onPress={() => setSpeed(0)} color="#FF3B30" />
          <Button title={isDriving ? "Stop Driving" : "Start Driving"} onPress={toggleDriving} color="#FF3B30" />
        </View> */}
      </View>
      {isDrawerOpen && <DrawerContent />}
    </SafeAreaView>
  );
}
