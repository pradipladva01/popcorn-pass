import React, { useEffect } from "react";
import { Search, X } from "lucide-react"; // Import the X icon
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ setSearchedMovies, setHeader, query, setQuery }) => {
  const fetchSearch = async (searchQuery) => {
    try {

      const cachedResults = localStorage.getItem(`search-${searchQuery}`);
      if (cachedResults) {
        const data = JSON.parse(cachedResults);
        setSearchedMovies(data.results || []);
        setHeader(
          data.results.length
            ? `Results for "${searchQuery}"`
            : `No results found for "${searchQuery}"`
        );
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/search/movie`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            with_origin_country: "IN",
            language: "en-US",
            query: searchQuery,
            page: 1,
            include_adult: true,
          },
        }
      );

      const data = response.data;
          localStorage.setItem(`search-${searchQuery}`, JSON.stringify(data));

      setSearchedMovies(data.results || []);
      setHeader(
        data.results.length
          ? `Results for "${searchQuery}"`
          : `No results found for "${searchQuery}"`
      );
    } catch (error) {
      console.error(error.message);
      setHeader(`Error fetching results for "${searchQuery}"`);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchSearch = debounce((searchQuery) => {
    if (searchQuery?.trim()) {
      fetchSearch(searchQuery);
    } else {
      setSearchedMovies([]);
      setHeader("");
    }
  }, 300);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchSearch(newQuery);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchedMovies([]);
    setHeader("");
  };

  useEffect(() => {
    if (!query?.trim()) {
      setHeader("");
      setSearchedMovies([]);
    }
  }, [query, setSearchedMovies, setHeader]);

  return (
    <div className="search_bar_container">
      <input
        type="text"
        placeholder="Search movies"
        className="search_bar_input"
        value={query || ""}
        onChange={handleInputChange}
      />
      {query?.trim() ? (
        <button className="search_bar_button" onClick={clearSearch}>
          <X color="#fff" />
        </button>
      ) : (
        <button className="search_bar_button">
          <Search color="#fff" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
