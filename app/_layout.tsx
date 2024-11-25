import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <>
        <Stack.Screen
          name="index"
          options={{
            title: "Croozz",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="leaderboard"
          options={{
            title: "Leaderboard",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth"
          options={{
            title: "Authentication",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registration"
          options={{
            title: "Registration",
            headerShown: false,
          }}
        />
      </>
      )
    </Stack>
  );
}
