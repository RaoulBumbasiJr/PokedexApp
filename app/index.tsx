import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    PokemonSolid: require("../assets/fonts/PokemonSolid.ttf"),
  });
  if (!fontsLoaded) {
    return null; // Render nothing until font is loaded
  }

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={[styles.title, styles.welcomeText]}>Welcome to the</Text>
        <Text style={[styles.title, styles.appText]}>Pokédex App!</Text>
      </View>

      {/* Divider Line */}
      <View style={styles.dividerLine} />

      {/* Circle Button */}
      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => router.push("/PokedexScreen")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.credits}>Created by:</Text>
        <Text style={styles.credits}>Raoul Bumbasi Jr</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  topSection: {
    flex: 1,
    backgroundColor: "#CC0000",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  dividerLine: {
    height: 4,
    backgroundColor: "#000",
    width: "100%",
    position: "absolute",
    top: "50%",
    zIndex: 1,
  },
  title: {
    fontFamily: "PokemonSolid",
    fontSize: 30,
    color: "#FFD700",
    textAlign: "center",
  },
  welcomeText: {
    marginBottom: 10,
  },
  appText: {
    fontSize: 30,
  },
  circleButton: {
    position: "absolute",
    top: "46%",
    left: "50%",
    transform: [{ translateX: -40 }], // Center the button horizontally
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 4,
    zIndex: 2,
  },
  buttonText: {
    fontFamily: "PokemonSolid",
    fontSize: 12,
    color: "#000",
  },
  credits: {
    fontFamily: "PokemonSolid",
    fontSize: 30,
    color: "#000",
    textAlign: "center",
  },
});
