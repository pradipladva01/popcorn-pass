import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Navbar.css";

const Navbar = ({ setSearchedMovies, setHeader, query, setQuery }) => {
  return (
    <nav className="main_navbar">
      <div className="container">
        <div className="row">
          <div className="navbar_bottom">
            <Link to="/" className="navbar-brand">
              <h1>
                Popcorn<span>Pass</span> 🍿
              </h1>
            </Link>
            <SearchBar
              setSearchedMovies={setSearchedMovies}
              setHeader={setHeader}
              query={query}
              setQuery={setQuery}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
