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
