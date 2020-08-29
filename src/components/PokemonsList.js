import React, { useEffect, useState } from "react";

// REDUX
import { useSelector } from "react-redux";

// AXIOS
import axios from "axios";

// COMPONENTS
import PokemonCard from "./PokemonCard";

// CSV
import { CSVLink } from "react-csv";

function PokemonsList() {
  const { filter } = useSelector((state) => state.pokemonReducer);
  console.log("filtro por:", filter);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [CSVData, setCSVData] = useState([]);

  const headers = [{ label: "Pokemon Name", key: "pokemonName" }];

  useEffect(() => {
    const fetchPokemonListData = async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      setPokemonsList(data.results);
    };
    fetchPokemonListData();
  }, []);

  useEffect(() => {
    setCSVData(
      pokemonsList
        .filter((pokemon) => pokemon.name.startsWith(filter))
        .map((pokemon) => {
          return { pokemonName: pokemon.name };
        })
    );
  }, [pokemonsList, filter]);

  return (
    <div className="pokemons__list">
      <CSVLink
        data={CSVData}
        filename={"pokemon_list.csv"}
        className="pokemon__list__download"
        target="_blank"
      >
        Download Pokemon List Filter
      </CSVLink>
      {pokemonsList
        .filter((pokemon) => pokemon.name.startsWith(filter))
        .map((pokemon, index) => {
          return (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
          );
        })}
    </div>
  );
}

export default PokemonsList;
