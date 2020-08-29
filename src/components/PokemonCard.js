import React, { useEffect, useState } from "react";

// REACT-ROUTER
import { Link } from "react-router-dom";

// AXIOS
import axios from "axios";

// IMAGES
import isLoadingGiF from "../images/isLoading.gif";

function PokemonCard({ name, url }) {
  const [pokemonId, setPokemonId] = useState(url.split("/")[6]);
  const [pokemonImage, setPokemonImage] = useState();
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonData = await axios.get(`${url}`);
      //console.log(pokemonData);
      setPokemonId(pokemonData.data.id);
      setPokemonTypes(pokemonData.data.types);
      setIsLoading(false);
    };
    fetchPokemonData();
  }, [name, url]);

  useEffect(() => {
    setPokemonImage(
      `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`
    );
  }, [pokemonId]);

  return (
    <Link
      to={{
        pathname: `/pokemon/detail/${pokemonId}`,
        state: { pokemonUrl: url, pokemonImage: pokemonImage },
      }}
      className="link__decoration"
    >
      <div className="pokemon__card">
        <span className="pokemon__card__id">Nº{pokemonId}</span>
        {isLoading ? (
          <img
            src={isLoadingGiF}
            alt="Is Loading GIF"
            className="is__loading"
          />
        ) : (
          <div className="pokemon__card__info__wrapper">
            <img
              src={pokemonImage}
              alt={(name, "image")}
              className="pokemon__card__image"
            />
            <p className="pokemon__card__name">{name}</p>
            <div className="pokemon__card__types">
              {pokemonTypes
                .map((pokemonType) => pokemonType.type.name)
                .map((typeName, index) => (
                  <span key={index} className={`pokemon__type ${typeName}`}>
                    {typeName}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default PokemonCard;
