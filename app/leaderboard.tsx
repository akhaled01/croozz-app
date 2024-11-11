import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Mock data for the leaderboard
const leaderboardData = [
  { id: '1', rank: 1, name: 'John Doe', score: 95, avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', rank: 2, name: 'Jane Smith', score: 92, avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', rank: 3, name: 'Bob Johnson', score: 88, avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', rank: 4, name: 'Alice Brown', score: 85, avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: '5', rank: 5, name: 'Charlie Davis', score: 82, avatar: 'https://i.pravatar.cc/100?img=5' },
];

const LeaderboardItem = ({ item, isDarkMode }: {
  item: {
    name: string;
    rank: number;
    score: number;
  };
  isDarkMode: boolean;
}) => (
  <View style={[styles.itemContainer, isDarkMode ? styles.darkItemContainer : styles.lightItemContainer]}>
    <View style={[styles.rankContainer, { backgroundColor: '#FF3B30' }]}>
      <Text style={styles.rank}>{item.rank}</Text>
    </View>
    <View style={styles.nameScoreContainer}>
      <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>{item.name}</Text>
      <Text style={[styles.score, isDarkMode ? styles.darkScore : styles.lightScore]}>{item.score} points</Text>
    </View>
  </View>
);

const LeaderboardScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(-300)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

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
        <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Leaderboard</Text>
        <FlatList
          data={leaderboardData}
          renderItem={({ item }) => <LeaderboardItem item={item} isDarkMode={isDarkMode} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <Text style={[styles.userRank, isDarkMode ? styles.darkText : styles.lightText]}>Your Rank: 15th</Text>
      </View>
      {isDrawerOpen && <DrawerContent />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 5,
    fontFamily: 'Inter_700Bold',
  },
  darkLogo: {
    color: '#FF3B30',
  },
  lightLogo: {
    color: '#FF3B30',
  },
  themeToggle: {
    padding: 5,
  },
  profileButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_700Bold',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  darkItemContainer: {
    backgroundColor: '#1E1E1E',
  },
  lightItemContainer: {
    backgroundColor: '#F2F2F7',
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
  nameScoreContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_700Bold',
  },
  score: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  darkScore: {
    color: '#B0B0B0',
  },
  lightScore: {
    color: '#666666',
  },
  userRank: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  overlayPressable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: WINDOW_WIDTH * 0.8,
    maxWidth: 300,
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  darkDrawer: {
    backgroundColor: '#1C1C1E',
  },
  lightDrawer: {
    backgroundColor: '#F2F2F7',
  },
  drawerHeader: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 15,
    marginTop: 40
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  closeButton: {
    padding: 5,
  },
});

export default LeaderboardScreen;
