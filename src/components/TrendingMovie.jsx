import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "./MovieCard";
import "../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const TrendingMovie = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/trending/movie/week`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              language: "hi-IN",
              page: 1,
            },
          }
        );
        const fetchedMovies = response.data.results || [];
        localStorage.setItem("trendingMovie", JSON.stringify(fetchedMovies));
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching trending Hindi movies:", error);
      }
    };
    const storedMovies = localStorage.getItem("trendingMovie");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      fetchTrendingMovies();
    }
  }, []);

  const handleMovieClick = (movie) => {
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  return (
    <>
      <section className="now_playing_movie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-8">
              <h1>Trending Movies</h1>
            </div>
            <div className="col-4">
              <div className="navigation-arrow">
                <button className="trending_prev-button">
                  <ArrowLeft />
                </button>
                <button className="trending_next-button">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Swiper
            className="trending-swiper"
            autoHeight={true}
            spaceBetween={20}
            slidesPerView={4}
            modules={[Navigation]}
            navigation={{
              prevEl: ".trending_prev-button",
              nextEl: ".trending_next-button",
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              767: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                  <MovieCard
                    image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    title={movie.title}
                    rating={movie.vote_average.toFixed(1)}
                    year={new Date(movie.release_date).getFullYear()}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default TrendingMovie;
