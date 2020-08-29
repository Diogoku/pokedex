import React from "react";

// REACT ROUTER
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// REUDX
import { Provider } from "react-redux";
import store from "../store";

// COMPONENTS
import Header from "./Header";
import PokemonsList from "./PokemonsList";
import PokemonDetail from "./PokemonDetail";
import FilterForm from "./form/FilterForm";

// CSS
import "../css/default.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/pokedex/">
            <FilterForm />
            <PokemonsList />
          </Route>
          <Route path="/pokedex/pokemon/detail/:pokemonId">
            <PokemonDetail />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
