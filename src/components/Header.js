import React from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="link__decoration">
        <h3 className="header-title">Pokédex</h3>
      </Link>
    </header>
  );
}

export default Header;
