import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      {/* Top Section */}
      <View>
        <Text>Welcome to the</Text>
        <Text>Pokédex App!</Text>
      </View>

      {/* Circle Button */}
      <TouchableOpacity onPress={() => router.push("../app/PokemonList.tsx")}>
        <Text>Start</Text>
      </TouchableOpacity>

      {/* Bottom Section */}
      <View>
        <Text>Created by:</Text>
        <Text> Raoul Bumbasi Jr</Text>
      </View>
    </View>
  );
}
