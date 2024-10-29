import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigationTypes";

type PokemonListProps = NativeStackScreenProps<
  RootStackParamList,
  "PokemonList"
>;

interface Pokemon {
  name: string;
  url: string;
}

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function PokemonList({ navigation }: PokemonListProps) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      const data = await getPokemonList(20, 0); // Fetch first 20 Pokémon
      setPokemon(data.results);
      setLoading(false);
    }
    fetchPokemon();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PokemonDetail", { name: item.name })
            }
          >
            <Text style={{ fontSize: 18, padding: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
