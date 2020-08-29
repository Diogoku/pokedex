import React, { useEffect, useState } from "react";

// REACT ROUTER
import { useParams, useHistory, useLocation } from "react-router-dom";

// AXIOS
import axios from "axios";

// IMAGES
import isLoadingGiF from "../images/isLoading.gif";

function PokemonDetail() {
  // REACT ROUTER VARIABLES
  let params = useParams();
  let history = useHistory();
  let location = useLocation();

  // POKEMON VARIABLES
  const [pokemonName, setPokemonName] = useState();
  const [pokemonIndex, setPokemonIndex] = useState();
  const [pokemonImage, setPokemonImage] = useState();
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonDescription, setPokemonDescription] = useState();
  const [pokemonHp, setPokemonHp] = useState();
  const [pokemonAttack, setPokemonAttack] = useState();
  const [pokemonDefense, setPokemonDefense] = useState();
  const [pokemonSpeed, setPokemonSpeed] = useState();
  const [pokemonSpecialAttack, setPokemonSpecialAttack] = useState();
  const [pokemonSpecialDefense, setPokemonSpecialDefense] = useState();
  const [pokemonHeight, setPokemonHeight] = useState();
  const [pokemonWeight, setPokemonWeight] = useState();
  const [pokemonEggGroups, setPokemonEggGroups] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonGenderRatioMale, setPokemonGenderRatioMale] = useState();
  const [pokemonGenderRatioFemale, setPokemonGenderRatioFemale] = useState();
  const [pokemonCatchRate, setPokemonCatchRate] = useState();
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    // FETCH POKEMON DATA SPECIES
    const fetchPokemonSpeciesData = async () => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${params.pokemonId}/`
      );

      data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === "en")
          setPokemonDescription(flavor.flavor_text);
      });

      setPokemonEggGroups(data.egg_groups.map((egg_group) => egg_group.name));
      setPokemonGenderRatioMale(data.gender_rate * 12.5);
      setPokemonGenderRatioFemale(12.5 * (8 - data.gender_rate));
      setPokemonCatchRate(Math.round((100 / 255) * data.capture_rate));
      setIsLoading1(false);
    };

    const fetchPokemonData = async () => {
      const { data } = await axios.get(location.state.pokemonUrl);

      setPokemonName(data.name);
      setPokemonIndex(data.id);
      setPokemonImage(location.state.pokemonImage);
      setPokemonTypes(data.types.map((index) => index.type.name));
      // CONVERT DECIMETERS TOO FEET
      setPokemonHeight(
        Math.round((data.height * 0.328084 + 0.0001) * 100) / 100
      );
      // CONVERT TO LBS
      setPokemonWeight(
        Math.round((data.weight * 0.220462 + 0.0001) * 100) / 100
      );
      setPokemonAbilities(data.abilities.map((index) => index.ability.name));

      data.stats.map((stat) => {
        switch (stat.stat.name) {
          case "hp":
            setPokemonHp(stat.base_stat);
            break;
          case "attack":
            setPokemonAttack(stat.base_stat);
            break;
          case "defense":
            setPokemonDefense(stat.base_stat);
            break;
          case "speed":
            setPokemonSpeed(stat.base_stat);
            break;
          case "special-attack":
            setPokemonSpecialAttack(stat.base_stat);
            break;
          case "special-defense":
            setPokemonSpecialDefense(stat.base_stat);
            break;
        }
      });
      setIsLoading2(false);
    };

    fetchPokemonData();
    fetchPokemonSpeciesData();
  }, []);

  return (
    <div>
      <div className="button__go__back__wrapper">
        <button
          type="button"
          onClick={() => history.goBack()}
          className="button__go__back"
        >
          Go Back
        </button>
      </div>
      <div className="pokemon__detail__card">
        {isLoading1 || isLoading2 ? (
          <img
            src={isLoadingGiF}
            alt="Is Loading GIF"
            className="is__loading"
          />
        ) : (
          <div>
            <div className="pokemon__detail__card__header">
              <div className="pokemon__detail__card__header__info">
                <span>{pokemonIndex}</span>
                <p className="pokemon__detail__card__name capitalize">
                  {pokemonName}
                </p>
              </div>
              <div className="pokemon__detail__card__header__types">
                {pokemonTypes.map((typeName, index) => {
                  return (
                    <span key={index} className={`pokemon__type ${typeName}`}>
                      {typeName}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="pokemon__detail__card__body">
              <div className="pokemon__detail__card__body__stats">
                <div className="pokemon__detail__card__image__wrapper">
                  <img
                    src={pokemonImage}
                    alt={(name, "image")}
                    className="pokemon__card__image"
                  />
                </div>

                <div className="pokemon__detail__card__stats">
                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">Hp</p>
                    <progress
                      max="100"
                      value={pokemonHp}
                      data-label={pokemonHp}
                    >
                      {pokemonHp}
                    </progress>
                  </div>
                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">Attack</p>
                    <progress
                      max="100"
                      value={pokemonAttack}
                      data-label={pokemonAttack}
                    >
                      {pokemonAttack}
                    </progress>
                  </div>

                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">Defense</p>
                    <progress
                      max="100"
                      value={pokemonDefense}
                      data-label={pokemonDefense}
                    >
                      {pokemonDefense}
                    </progress>
                  </div>

                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">Speed</p>
                    <progress
                      max="100"
                      value={pokemonSpeed}
                      data-label={pokemonSpeed}
                    >
                      {pokemonSpeed}
                    </progress>
                  </div>

                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">
                      Special Attack
                    </p>
                    <progress
                      max="100"
                      value={pokemonSpecialAttack}
                      data-label={pokemonSpecialAttack}
                    >
                      {pokemonSpecialAttack}
                    </progress>
                  </div>

                  <div className="pokemon__detail__card__stat">
                    <p className="pokemon__detail__card__stat__name">
                      Special Defense
                    </p>
                    <progress
                      max="100"
                      value={pokemonSpecialDefense}
                      data-label={pokemonSpecialDefense}
                    >
                      {pokemonSpecialDefense}
                    </progress>
                  </div>
                </div>
              </div>
              <div className="pokemon__detail__card__body__description">
                <h3 className="pokemon__detail__card__body__description__title">
                  Description
                </h3>
                <p>{pokemonDescription}</p>
                <div className="pokemon__detail__card__body__description__groups">
                  <div className="pokemon__detail__card__body__description__group">
                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Height: </p>
                      <p>{pokemonHeight} ft.</p>
                    </div>

                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Weight: </p>
                      <p> {pokemonWeight} lbs.</p>
                    </div>
                  </div>

                  <div className="pokemon__detail__card__body__description__group">
                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Catch Rate: </p>
                      <p> {pokemonCatchRate}%</p>
                    </div>
                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Gender Ratio: </p>
                      <p>
                        {" "}
                        M {pokemonGenderRatioMale}%, F{" "}
                        {pokemonGenderRatioFemale}%
                      </p>
                    </div>
                  </div>

                  <div className="pokemon__detail__card__body__description__group">
                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Egg Group&#40;s&#41;: </p>
                      <p>
                        {" "}
                        {pokemonEggGroups.map((eggGroup, index) => (
                          <span key={index} className="capitalize">
                            {" "}
                            {eggGroup}{" "}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="pokemon__detail__card__body__description__group__align">
                      <p>Abilitie&#40;s&#41;: </p>
                      <p>
                        {" "}
                        {pokemonAbilities.map((abilitie, index) => {
                          return (
                            <span key={index} className="capitalize">
                              {" "}
                              {abilitie}{" "}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetail;
