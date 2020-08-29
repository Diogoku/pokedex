import { FILTER_POKEMONS } from "../actions/types";

const initialState = { filter: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_POKEMONS:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};
