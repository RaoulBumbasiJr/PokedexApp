// app/PokedexScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function PokedexScreen() {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState(""); // For storing the description
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch Pokémon data and description
  const fetchPokemon = async (name: string) => {
    setLoading(true);
    setError("");
    setDescription(""); // Clear previous description
    try {
      // Fetch basic Pokémon data
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setPokemon(data);

      // Fetch Pokémon description from species endpoint
      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
      );
      const speciesData = await speciesResponse.json();

      // Find the first English-language entry
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === "en"
      );

      setDescription(
        englishEntry ? englishEntry.flavor_text : "Description not available."
      );
    } catch (err: any) {
      setError(err.message || "An error occurred.");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Pokédex App!</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => fetchPokemon(searchText)}
      />

      {/* Displaying Pokémon Information */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : pokemon ? (
        <View style={styles.resultBox}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImage}
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Name: {pokemon.name}</Text>
            <Text style={styles.infoText}>Number: #{pokemon.id}</Text>
            <Text style={styles.infoText}>
              Type:{" "}
              {pokemon.types
                .map((typeInfo: any) => typeInfo.type.name)
                .join(", ")}
            </Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>Description:</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.placeholderText}>
          Enter a Pokémon name to search...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 20,
  },
  header: {
    backgroundColor: "#CC0000",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#FFD700",
    fontSize: 24,
    fontFamily: "PokemonSolid",
  },
  searchBar: {
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  infoBox: {
    width: "100%",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "PokemonSolid",
    color: "#000",
  },
  descriptionBox: {
    width: "100%",
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "PokemonSolid",
    color: "#333",
  },
  placeholderText: {
    textAlign: "center",
    fontSize: 16,
    color: "#AAA",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
