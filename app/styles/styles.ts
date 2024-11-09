import { StyleSheet, Platform, Dimensions } from "react-native";

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  closeButton: {
    padding: 5,
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  odometerContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  darkOdometerContainer: {
    backgroundColor: '#2C2C2E',
  },
  lightOdometerContainer: {
    backgroundColor: '#E5E5EA',
  },
  digitContainer: {
    width: 50,
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  digit: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 60,
    fontFamily: 'Inter_700Bold',
  },
  darkDigit: {
    color: 'white',
  },
  lightDigit: {
    color: 'black',
  },
  speedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  speedUnit: {
    fontSize: 18,
    color: '#FF3B30',
    fontFamily: 'Inter_400Regular',
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  darkStatusContainer: {
    backgroundColor: '#2C2C2E',
  },
  lightStatusContainer: {
    backgroundColor: '#E5E5EA',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
});