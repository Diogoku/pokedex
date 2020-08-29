import { FILTER_POKEMONS } from "./types";

// POKEMON ACTIONS CREATOR

// FILTER POKEMONS NAME
export const filterPokemons = (filterChar) => {
  return {
    type: FILTER_POKEMONS,
    filter: filterChar,
  };
};
