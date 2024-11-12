import React, { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { styles } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export const Drawer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const drawerAnimation = useRef(new Animated.Value(-300)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return {
    Component: () =>
      isDrawerOpen && (
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
                onPress={() => router.replace("/")}
              >
                Home
              </Text>
              <Text
                style={[
                  styles.drawerTitle,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}
                onPress={() => router.replace("/leaderboard")}
              >
                Leaderboard
              </Text>
              <TouchableOpacity
                onPress={closeDrawer}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={isDarkMode ? "#FFF" : "#000"}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      ),
    Trigger: openDrawer,
  };
};
