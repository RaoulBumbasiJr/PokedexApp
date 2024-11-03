import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* This now points to your renamed HomeScreen */}
      <Stack.Screen
        name="PokemonDetail"
        options={{ title: "Pokémon Details" }}
      />
    </Stack>
  );
}
