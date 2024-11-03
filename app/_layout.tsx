import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      {/* Home screen */}
      <Stack.Screen name="PokemonList" options={{ title: "Pokémon List" }} />
      {/* Pokémon list screen */}
      <Stack.Screen
        name="PokemonDetail"
        options={{ title: "Pokémon Details" }}
      />
      {/* Pokémon detail screen */}
    </Stack>
  );
}
