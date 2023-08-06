/* eslint-disable react/prop-types */
import PokemonCard from "./PokemonCard";
import usePokemons from "../hooks/usePokemons";

const PokemonsContainer = ({ type }) => {
  const { pokemons, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemons(type);

  window.onscroll = () => {
    if (
      document.documentElement.scrollHeight - window.innerHeight <=
      document.documentElement.scrollTop
    ) {
      if (hasNextPage) {
        fetchNextPage();
      }
    }
  };

  return (
    <div className="pokemons-container">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
      {isFetchingNextPage ? "Loading..." : ""}
    </div>
  );
};

export default PokemonsContainer;
