# CROOZZ App - Debug Iteration Guide

This guide will walk you through running a debug iteration of the **CROOZZ** app using Expo and the background geolocation feature from TransistorSoft. This guide assumes you have already ejected the Expo project and set up your Android development environment.

### Prerequisites

Before you begin, ensure the following dependencies and tools are installed:

1. **Node.js & npm**: Ensure that you have Node.js and npm installed. You can download it from [here](https://nodejs.org/en/).
2. **Expo CLI**: Install Expo CLI globally using npm:
   ```bash
   npm install -g expo-cli
   ```
3. **Android SDK**: The Android SDK must be installed and its path correctly set up in your environment. The default location is usually `$HOME/Android/sdk`.
4. **TransistorSoft’s react-native-background-geolocation**: Make sure you've installed this package after ejecting from Expo.

### Libraries Used

- **react-native-background-geolocation**: For tracking user location in the background.
- **Expo**: Used for development and building the project.

  To install dependencies:

  ```bash
  npm install react-native-background-geolocation
  npx pod-install
  ```

### Running CROOZZ in Debug Mode

1. Clone or navigate to the root directory of the **CROOZZ** app.
2. Ensure that you have ejected the app from Expo using the following command (if not already done):

   ```bash
   npm run prebuild
   ```

> [!IMPORTANT]
> Follow [Transistorsoft's Guide](https://github.com/transistorsoft/react-native-background-geolocation/blob/master/help/INSTALL-EXPO.md) to setup the rest of the app on expo.

3. You can then use the `android.sh` script to kickstart the Android build process.

### Script: `android.sh`

Here’s a breakdown of the `android.sh` script that automates the Android build for development:

```bash
#!/bin/bash

# Script to kickstart the Android building process using Expo.
# This script should be run from the root directory of the project.

echo "Kickstarting Android building process..."

# Define the Android SDK path.
ANDROID_HOME="$HOME/Android/sdk"

# Check if the Android SDK path exists.
if [ ! -d "$ANDROID_HOME" ]; then
  echo "Error: Android SDK directory not found at $ANDROID_HOME"
  echo "Please ensure Android SDK is installed and the path is correct."
  exit 1
fi

echo "Dev SDK found at $ANDROID_HOME"

# Check if npx is installed.
if ! command -v npx &> /dev/null; then
  echo "Error: npx is not installed. Please install Node.js and npx."
  exit 1
fi

# Create or update the local.properties file with the Android SDK path.
echo "sdk.dir = $ANDROID_HOME" > android/local.properties
echo "Updated android/local.properties with Android SDK path."

echo "Running npm run android"

npm run android

echo "successful running iteration"
```

### Steps to Use the Script:

1. **Make the script executable**:

   ```bash
   chmod +x android.sh
   ```
2. **Run the script** from the root of your project:

   ```bash
   ./android.sh
   ```

   - The script checks for the presence of the Android SDK and `npx`.
   - It updates the `android/local.properties` file with the Android SDK path.
   - It triggers the Android build process by running `npm run android`.

### Debugging Features

To enable debug mode in your **CROOZZ** app using `react-native-background-geolocation`, ensure you configure the background geolocation in your `App.js` as follows:

```js
import BackgroundGeolocation from "react-native-background-geolocation";

BackgroundGeolocation.ready({
  reset: true,
  debug: true,  // <-- Enables debug sounds and notifications
  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 10,
  stopOnTerminate: false,
  startOnBoot: true,
  foregroundService: true
}, (state) => {
  console.log("BackgroundGeolocation is ready");
  if (!state.enabled) {
    BackgroundGeolocation.start();
  }
});
```

### Build and Run on Android

1. After running the `android.sh` script, your app should be ready to run in debug mode on an Android emulator or a physical device.
2. Use this command to start the debug build manually (if needed):

   ```bash
   npm run android
   ```
3. Ensure you have the correct permissions in your `android/app/src/debug/AndroidManifest.xml` for accessing location in **debug** mode:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
```

### Conclusion

Following these steps, you can now build and test **CROOZZ** in debug mode using Expo, React Native, and the background geolocation package from TransistorSoft. The `android.sh` script simplifies the process, so make sure to use it whenever you want to initiate a new debug build on Android.

### Notes:

- In debug mode, you can run the app without a paid license key for `react-native-background-geolocation`. When you are ready to switch to production, remember to provide the key.
- For iOS builds, similar steps apply, but testing on a physical iOS device is required due to background geolocation limitations on iOS simulators.
