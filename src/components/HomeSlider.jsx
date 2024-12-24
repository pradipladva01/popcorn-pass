import React, { useEffect, useState } from "react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AsyncImage } from "loadable-image";
import axios from "axios";
import PlaceHolderImg from "../resources/images/backdrop_placeholder.png";

const HomeSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesInTheaters = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/movie/now_playing`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              with_origin_country: "IN",
              language: "en-US",
              region: "IN",
              page: 1,
            },
          }
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error(
          "Error fetching movies currently in theaters in India:",
          error
        );
      }
    };

    fetchMoviesInTheaters();
  }, []);

  return (
    <>
      <Swiper
        className="home_swiper"
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
        speed={1000}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="movie_poster">
              <div className="poster_img">
                <AsyncImage
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                      : PlaceHolderImg
                  }
                  alt={movie.title}
                  loader={
                    <div
                      style={{
                        backgroundColor: "#8e8e8e26",
                        borderRadius: "12px",
                      }}
                    />
                  }
                />
                <div className="backdrop"></div>
                <div className="movie_info">
                  <h1>{movie.title}</h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeSlider;
