import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../utils/api-fetch";
import { formatPokemonData } from "../utils/pokemon-helper";

const usePokemons = (type) => {
  const fetchPokemons = async (key, page = 1) => {
    const { pokemon: pokemonList } = await apiFetch(`/type/${type}`, { page });

    const pokemons = await Promise.all(
      pokemonList.map(async ({ pokemon }) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();

        return formatPokemonData(data);
      })
    );

    return pokemons;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["pokemons", type], fetchPokemons, {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    });

  return {
    pokemons: data ? data.pages.flat() : [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default usePokemons;
