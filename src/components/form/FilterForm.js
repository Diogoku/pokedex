import React from "react";

// REDUX
import { useDispatch } from "react-redux";
import { filterPokemons } from "../../actions/pokemonActionsCreator";

function FilterForm() {
  const dispatch = useDispatch();
  const filterChar = (e) => {
    dispatch(filterPokemons(e.target.value.toLowerCase()));
  };
  return (
    <form className="pokemon__form__filter__name">
      <label htmlFor="filterChar">Filter By Name</label>
      <input
        type="text"
        id="filterChar"
        className="input"
        name="filterChar"
        onChange={filterChar}
      />
    </form>
  );
}

export default FilterForm;
