import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" }, // Background color
        headerTintColor: "#000", // Text color
        headerTitleStyle: { fontWeight: "bold", fontSize: 20 }, // Font styling
        headerTitleAlign: "center", // Align title to center
      }}
    >
      <Stack.Screen name="index" options={{ title: "Pokémon List" }} />
      <Stack.Screen
        name="PokemonDetail"
        options={{ title: "Pokémon Details" }}
      />
    </Stack>
  );
}
