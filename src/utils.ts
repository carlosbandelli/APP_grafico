export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  gifUrlFront: string[];
  gifUrlBack: string[];
  cry: string;
}

export const getPokemonData = async (): Promise<Pokemon[]> => {
  const firstGenerationPokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);
  const pokemonDetails = await Promise.all(
    firstGenerationPokemonIds.map(async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemon = await response.json();
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
        gifUrlFront: pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default,
        gifUrlBack: pokemon.sprites.versions["generation-v"]["black-white"].animated.back_default,
        cry: pokemon.cries.latest,
      };
    })
  );
  return pokemonDetails;
};
