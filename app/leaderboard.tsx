import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
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
import { Drawer } from "./components/Drawer";
import { leaderboardStyles } from "./styles/leaderboardStyles";

// Mock data for the leaderboard
const leaderboardData = [
  {
    id: "1",
    rank: 1,
    name: "John Doe",
    score: 95,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    rank: 2,
    name: "Jane Smith",
    score: 92,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    rank: 3,
    name: "Bob Johnson",
    score: 88,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    rank: 4,
    name: "Alice Brown",
    score: 85,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "5",
    rank: 5,
    name: "Charlie Davis",
    score: 82,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const LeaderboardItem = ({
  item,
  isDarkMode,
}: {
  item: {
    name: string;
    rank: number;
    score: number;
  };
  isDarkMode: boolean;
}) => (
  <View
    style={[
      leaderboardStyles.itemContainer,
      isDarkMode
        ? leaderboardStyles.darkItemContainer
        : leaderboardStyles.lightItemContainer,
    ]}
  >
    <View
      style={[leaderboardStyles.rankContainer, { backgroundColor: "#FF3B30" }]}
    >
      <Text style={leaderboardStyles.rank}>{item.rank}</Text>
    </View>
    <View style={leaderboardStyles.nameScoreContainer}>
      <Text
        style={[
          leaderboardStyles.name,
          isDarkMode ? leaderboardStyles.darkText : leaderboardStyles.lightText,
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          leaderboardStyles.score,
          isDarkMode
            ? leaderboardStyles.darkScore
            : leaderboardStyles.lightScore,
        ]}
      >
        {item.score} points
      </Text>
    </View>
  </View>
);

const LeaderboardScreen = () => {
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
        leaderboardStyles.container,
        isDarkMode
          ? leaderboardStyles.darkContainer
          : leaderboardStyles.lightContainer,
      ]}
      onLayout={onLayoutRootView}
    >
      <View style={leaderboardStyles.header}>
        <TouchableOpacity
          onPress={openDrawer}
          style={leaderboardStyles.profileButton}
        >
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={isDarkMode ? "#FFF" : "#000"}
            styles
          />
        </TouchableOpacity>
        <Text
          style={[
            leaderboardStyles.logo,
            isDarkMode
              ? leaderboardStyles.darkLogo
              : leaderboardStyles.lightLogo,
          ]}
        >
          CROOZZ
        </Text>
        <TouchableOpacity
          style={leaderboardStyles.themeToggle}
          onPress={toggleTheme}
        >
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={isDarkMode ? "#FFF" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={leaderboardStyles.content}>
        <Text
          style={[
            leaderboardStyles.title,
            isDarkMode
              ? leaderboardStyles.darkText
              : leaderboardStyles.lightText,
          ]}
        >
          Leaderboard
        </Text>
        <FlatList
          data={leaderboardData}
          renderItem={({ item }) => (
            <LeaderboardItem item={item} isDarkMode={isDarkMode} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={leaderboardStyles.listContainer}
        />
        <Text
          style={[
            leaderboardStyles.userRank,
            isDarkMode
              ? leaderboardStyles.darkText
              : leaderboardStyles.lightText,
          ]}
        >
          Your Rank: 15th
        </Text>
      </View>
      <DrawerComponent />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
