import { StyleSheet, Dimensions } from "react-native";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

export const leaderboardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  lightContainer: {
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 5,
    fontFamily: "Inter_700Bold",
  },
  darkLogo: {
    color: "#FF3B30",
  },
  lightLogo: {
    color: "#FF3B30",
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_700Bold",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  darkItemContainer: {
    backgroundColor: "#1E1E1E",
  },
  lightItemContainer: {
    backgroundColor: "#F2F2F7",
  },
  rankContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
  },
  nameScoreContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_700Bold",
  },
  score: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  darkText: {
    color: "#FFFFFF",
  },
  lightText: {
    color: "#000000",
  },
  darkScore: {
    color: "#B0B0B0",
  },
  lightScore: {
    color: "#666666",
  },
  userRank: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Inter_400Regular",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  overlayPressable: {
    flex: 1,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: WINDOW_WIDTH * 0.8,
    maxWidth: 300,
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 1001,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  darkDrawer: {
    backgroundColor: "#1C1C1E",
  },
  lightDrawer: {
    backgroundColor: "#F2F2F7",
  },
  drawerHeader: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 15,
    marginTop: 40,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
  },
  closeButton: {
    padding: 5,
  },
});
