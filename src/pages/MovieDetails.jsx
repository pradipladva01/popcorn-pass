import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MovieCard from "../components/MovieCard";
import { ArrowLeft, ArrowRight, Download, Link } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AsyncImage } from "loadable-image";
import slugify from "slugify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import NoData from "../resources/images/no_data.svg";
import Footer from "../components/Footer/Footer";
import UsePageTitle from "../components/UsePageTitle";
import PlaceHolderImg from "../resources/images/img_placeholder.png";

const MovieDetails = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [header, setHeader] = useState("");
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieImages, setMovieImages] = useState([]);
  const [video, setVideo] = useState([]);
  UsePageTitle("Movie Details | PopcornPass - Movie Central");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/movie/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              append_to_response: "credits, images, videos",
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    const fetchImages = async () => {
      await fetchMovieImages(id);
    };

    fetchMovieDetails();
    fetchImages();
  }, [id]);

  const fetchMovieImages = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/movie/${id}/images`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );

      setMovieImages((prevImages) => ({
        ...prevImages,
        [id]: response.data.backdrops || [],
      }));
    } catch (error) {
      console.error("Error fetching movie images:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en-US",
          },
        }
      );
      setVideo(response.data.results);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const renderYoutubeVideos = () => {
    const trailers = video.filter((v) => v.type === "Trailer");
    if (trailers.length === 0) return <p>No videos available</p>;

    return trailers.map((trailer) => (
      <div key={trailer.id} style={{ margin: "10px 0" }}>
        <h5>{trailer.name}</h5>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    ));
  };

  const handleMovieClick = (movie) => {
    setQuery("");
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  const { title, release_date, original_language } = movie || {};
  const year = release_date ? new Date(release_date).getFullYear() : "Unknown";

  const downloadLinks = [
    { quality: "480p" },
    { quality: "720p" },
    { quality: "1080p" },
    { quality: "4K" },
  ];
  console.log(movieImages);

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
          <section className="movie_details">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {movie ? (
                    <>
                      {!loading ? (
                        <div className="movie_details_main">
                          <div className="movie_inner_card">
                            <h1>{movie?.title}</h1>
                            <p className="main_p">{movie?.tagline}</p>
                            <div className="movie_main_card">
                              <div className="movie_main_card_left">
                                <AsyncImage
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
                              </div>
                              <div className="movie_main_card_right">
                                <h5>{movie?.title}</h5>
                                <p>
                                  {movie?.release_date &&
                                    new Date(
                                      movie.release_date
                                    ).toLocaleDateString("en-US", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                </p>

                                <div className="movie_dir_name">
                                  <p>
                                    Director:{" "}
                                    <span>
                                      {" "}
                                      {movie?.credits?.crew &&
                                        movie.credits.crew.find(
                                          (member) => member.job === "Director"
                                        )?.name}
                                    </span>
                                  </p>
                                </div>
                                <div className="movie_dir_name">
                                  <p>
                                    Producer:{" "}
                                    <span>
                                      {" "}
                                      {movie?.credits?.crew &&
                                        movie.credits.crew.find(
                                          (member) => member.job === "Producer"
                                        )?.name}
                                    </span>
                                  </p>
                                </div>
                                <div className="movie_dir_name">
                                  <p>
                                    Stars:{" "}
                                    <span>
                                      {movie?.credits?.cast
                                        ?.slice(0, 5)
                                        .map((actor, index) => (
                                          <span key={actor.cast_id}>
                                            {actor.name}
                                            {index < 4 ? ", " : ""}{" "}
                                          </span>
                                        ))}
                                    </span>
                                  </p>
                                </div>
                                <div className="movie_dir_name">
                                  <p>
                                    Countries:{" "}
                                    <span>
                                      {movie?.production_countries?.map(
                                        (country, index) => (
                                          <span key={index}>
                                            {country.name}
                                            {index <
                                            movie.production_countries.length -
                                              1
                                              ? ", "
                                              : ""}
                                          </span>
                                        )
                                      )}
                                    </span>
                                  </p>
                                </div>

                                <div className="movie_dir_name">
                                  <p>
                                    Languages:{" "}
                                    <span>
                                      {movie?.spoken_languages?.map(
                                        (language, index) => (
                                          <span key={index}>
                                            {language.english_name}
                                            {index <
                                            movie.spoken_languages.length - 1
                                              ? ", "
                                              : ""}
                                          </span>
                                        )
                                      )}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="movie_det_card">
                              <h5>Movie Details</h5>
                              <div className="movie_dir_name">
                                <p>
                                  Full Name: <span>{movie?.title}</span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Run Time:{" "}
                                  <span>
                                    {movie?.runtime
                                      ? `${Math.floor(movie?.runtime / 60)}h ${
                                          movie?.runtime % 60
                                        }m`
                                      : "-"}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Language:{" "}
                                  <span>
                                    {movie?.spoken_languages?.map(
                                      (language, index) => (
                                        <span key={index}>
                                          {language.english_name}
                                          {index <
                                          movie.spoken_languages.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      )
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Released Year:{" "}
                                  <span>
                                    {movie?.release_date
                                      ? new Date(
                                          movie.release_date
                                        ).getFullYear()
                                      : "-"}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Genres:{" "}
                                  <span>
                                    {movie?.genres?.map((genre, index) => (
                                      <span key={genre.id}>
                                        {genre.name}
                                        {index < movie.genres.length - 1
                                          ? ", "
                                          : ""}{" "}
                                      </span>
                                    ))}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Cast:{" "}
                                  <span>
                                    {movie?.credits?.cast
                                      ?.slice(0, 5)
                                      .map((actor, index) => (
                                        <span key={actor.cast_id}>
                                          {actor.name}
                                          {index < 4 ? ", " : ""}{" "}
                                        </span>
                                      ))}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Budget:{" "}
                                  <span>
                                    {movie?.budget
                                      ? `$${movie?.budget.toLocaleString()}`
                                      : "Not available"}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Revenue:{" "}
                                  <span>
                                    {movie?.revenue
                                      ? `$${movie?.revenue.toLocaleString()}`
                                      : "Not available"}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Popularity:{" "}
                                  <span>
                                    {movie?.popularity
                                      ? movie?.popularity.toFixed(2)
                                      : "Not available"}
                                  </span>
                                </p>
                              </div>
                              <div className="movie_dir_name">
                                <p>
                                  Rating: <span>{movie?.vote_average}</span>{" "}
                                  (Based on <span>{movie?.vote_count}</span>{" "}
                                  votes)
                                </p>
                              </div>
                            </div>
                            <div class="movie_cast">
                              <div class="top_cast">
                                <h5>Movie Cast</h5>
                                <div className="navigation-arrow">
                                  <button className="cast_prev-button">
                                    <ArrowLeft />
                                  </button>
                                  <button className="cast_next-button">
                                    <ArrowRight />
                                  </button>
                                </div>
                              </div>
                              <Swiper
                                className="movie_cast-swiper"
                                autoHeight={true}
                                spaceBetween={20}
                                slidesPerView={4}
                                modules={[Navigation]}
                                navigation={{
                                  prevEl: ".cast_prev-button",
                                  nextEl: ".cast_next-button",
                                }}
                                breakpoints={{
                                  320: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                  },
                                  480: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                  },
                                  767: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                  },
                                  992: {
                                    slidesPerView: 5,
                                    spaceBetween: 20,
                                  },
                                }}
                              >
                                {movie?.credits?.cast?.map((movie) => (
                                  <SwiperSlide key={movie.id}>
                                    <div key={movie.id}>
                                      <div className="movie_cast_card">
                                        <AsyncImage
                                          src={
                                            movie.profile_path
                                              ? `https://image.tmdb.org/t/p/w500${movie.profile_path}`
                                              : PlaceHolderImg
                                          }
                                          alt={`${
                                            movie.name || "Unknown"
                                          } poster`}
                                          loader={
                                            <div
                                              style={{
                                                backgroundColor: "#8e8e8e26",
                                                borderRadius: "8px",
                                              }}
                                            />
                                          }
                                        />
                                        <h6>{movie.name || "-"}</h6>
                                        <p>({movie.character || "-"})</p>
                                      </div>
                                    </div>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                            <div className="movie_det_card">
                              <h5>Storyline</h5>
                              <div className="movie_dir_name">
                                <p>
                                  {movie?.overview
                                    ? movie?.overview
                                    : "No storyline available"}
                                </p>
                              </div>
                            </div>
                            {console.log(movieImages)}
                            <div className="movie_screen_shorts">
                              <h5>Screenshots</h5>
                              <div className="screen_shots_main">
                                {movieImages[id] &&
                                movieImages[id].length > 0 ? (
                                  movieImages[id]
                                    .slice(0, 15)
                                    .map((image, index) => (
                                      <AsyncImage
                                        src={
                                          image.file_path
                                            ? `https://image.tmdb.org/t/p/w1280${image.file_path}`
                                            : PlaceHolderImg
                                        }
                                        alt={`Movie Backdrop ${index + 1}`}
                                        key={index}
                                        loader={
                                          <div
                                            style={{
                                              backgroundColor: "#8e8e8e26",
                                              borderRadius: "12px",
                                            }}
                                          />
                                        }
                                      />
                                    ))
                                ) : (
                                  <p>No images available</p>
                                )}
                              </div>
                            </div>
                            <div className="movie_download_link">
                              {downloadLinks.map((download, index) => (
                                <div key={index} className="download_link">
                                  <h5>{`${title} (${year}) ${original_language} ${download.quality}`}</h5>
                                  <div className="download_main_btn">
                                    <button className="google_drive_download_btn">
                                      <Link to={download.link} />
                                      Google Drive
                                    </button>
                                    <button className="download_btn">
                                      <Download /> Download
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div class="movie_Trailer">
                              {renderYoutubeVideos()}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div class="no_data_found">
                          <img src={NoData} alt="No Data Found" />
                          <h5>No data found</h5>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod, ipsum.
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div class="loading_movie">
                        <div class="spinner-border" role="status"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default MovieDetails;
