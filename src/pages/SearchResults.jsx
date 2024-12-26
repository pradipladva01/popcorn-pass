import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import slugify from "slugify";
import Footer from "../components/Footer/Footer";
import UsePageTitle from "../components/UsePageTitle";

const SearchResults = ({ setQuery }) => {
  const { query } = useParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  UsePageTitle("Search Results | PopcornPass - Movie Central");

  useEffect(() => {
    if (!query) {
      setSearchedMovies([]);
      setHeader("");
      setError(null);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      const cachedResults = localStorage.getItem(`search-${query}`);
      if (cachedResults) {
        const results = JSON.parse(cachedResults);
        if (results.length === 0) {
          setError("No movies found for your search.");
        } else {
          setSearchedMovies(results);
        }
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "1f57f80163b864834170816d01793bd3",
              language: "en-US",
              query: query,
              page: 1,
              include_adult: false,
            },
          }
        );

        const results = response.data.results;

        if (results.length === 0) {
          setError("No movies found for your search.");
        } else {
          setSearchedMovies(results);
          // Cache the results in localStorage
          localStorage.setItem(`search-${query}`, JSON.stringify(results));
        }
      } catch (err) {
        setError("Error fetching results. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();

    return () => {
      setSearchedMovies([]);
      setError(null);
      setLoading(false);
    };
  }, [query]);

  const handleSearchChange = (newQuery) => {
    setHeader(newQuery);
    navigate(`/search/${newQuery}`);
  };

  const handleMovieClick = (movie) => {
    setQuery("");
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <>
      <Navbar
        setSearchedMovies={setSearchedMovies}
        setHeader={handleSearchChange}
      />
      {error && <div className="error-message">{error}</div>}
      {header && <h2>Results for: {header}</h2>}

      {searchedMovies.length > 0 ? (
        <section className="movie_list">
          <div className="container">
            <div className="row">
              {searchedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                  onClick={() => handleMovieClick(movie)}
                >
                  <MovieCard
                    key={movie.id}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    title={movie.title}
                    rating={movie.vote_average.toFixed(1)}
                    year={new Date(movie.release_date).getFullYear()}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p>No Data</p>
      )}
      <Footer />
    </>
  );
};

export default SearchResults;
