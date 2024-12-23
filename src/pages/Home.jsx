import React, { useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar/Navbar";
import MovieCard from "../components/MovieCard";
import HomeSlider from "../components/HomeSlider";
import NowPlayingMovie from "../components/NowPlayingMovie";
import TrendingMovie from "../components/TrendingMovie";
import Genre from "../components/Genre";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import UsePageTitle from "../components/UsePageTitle";

const Home = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [header, setHeader] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  UsePageTitle("PopcornPass - Movie Central");

  const handleMovieClick = (movie) => {
    setQuery("");
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  return (
    <>
      <Navbar
        setSearchedMovies={setSearchedMovies}
        setHeader={setHeader}
        query={query}
        setQuery={setQuery}
      />
      {searchedMovies.length > 0 ? (
        <section className="movie_list">
          <div className="container">
            <div className="row">
              {query?.trim() || searchedMovies.length > 0 ? (
                <h1>{header}</h1>
              ) : null}
              {searchedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                  onClick={() => handleMovieClick(movie)}
                >
                  <MovieCard
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
        <>
          <section className="home_slider">
            <HomeSlider />
          </section>
          <Genre />
          <NowPlayingMovie />
          <TrendingMovie />
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
