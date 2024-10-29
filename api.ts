// api.ts
const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getPokemonDetails = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${name}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
