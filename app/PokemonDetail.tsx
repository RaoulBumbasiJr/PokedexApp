// app/PokemonDetail.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export default function PokemonDetail() {
  const { name } = useLocalSearchParams(); // Use useLocalSearchParams to get the 'name' parameter
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonDetails() {
      if (!name) return; // Check if name exists

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {pokemon?.name.toUpperCase()}
      </Text>
      <Image
        source={{ uri: pokemon?.sprites.front_default }}
        style={{ width: 150, height: 150 }}
      />
      <Text>Height: {pokemon?.height}</Text>
      <Text>Weight: {pokemon?.weight}</Text>
      <Text>Types:</Text>
      {pokemon?.types.map((type) => (
        <Text key={type.slot}>{type.type.name}</Text>
      ))}
    </View>
  );
}
