/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const genres = [
  { id: 28, label: "Action" },
  { id: 12, label: "Adventure" },
  { id: 16, label: "Animation" },
  { id: 35, label: "Comedy" },
  { id: 80, label: "Crime" },
  { id: 99, label: "Documentary" },
  { id: 18, label: "Drama" },
  { id: 10751, label: "Family" },
  { id: 14, label: "Fantasy" },
  { id: 36, label: "History" },
  { id: 27, label: "Horror" },
  { id: 10402, label: "Music" },
  { id: 9648, label: "Mystery" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Science Fiction" },
  { id: 10770, label: "TV Movie" },
  { id: 53, label: "Thriller" },
  { id: 10752, label: "War" },
  { id: 37, label: "Western" },
];
const Genre = () => {
  const tabContentRef = useRef(null);
  const [activeTab, setActiveTab] = useState(genres[0].id);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/discover/movie`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              with_genres: activeTab,
              with_origin_country: "IN",
              sort_by: "popularity.desc",
              page: currentPage,
            },
          }
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        // Dynamically calculate pages if needed
        if (response.data.total_pages) {
          updateVisiblePages(currentPage, response.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [activeTab, currentPage]);

  const updateVisiblePages = (page, total) => {
    const rangeSize = 3;
    const start = Math.max(1, page - Math.floor(rangeSize / 2));
    const end = Math.min(total, start + rangeSize - 1);
    setVisiblePages(
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    );
  };

  const handlePageChange = (page, shouldScroll = true) => {
    setCurrentPage(page);
    updateVisiblePages(page, movies.length);

    if (shouldScroll) {
      tabContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMovieClick = (movie) => {
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  return (
    <>
      <section className="generation_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul
                ref={tabContentRef}
                className="nav nav-pills genre_nav"
                id="pills-tab"
                role="tablist"
              >
                {genres.map((genre) => (
                  <li key={genre.id} className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === genre.id ? "active" : ""
                      }`}
                      id={`pills-${genre.id}-tab`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${genre.id}`}
                      aria-selected={activeTab === genre.id}
                      onClick={() => setActiveTab(genre.id)}
                    >
                      {genre.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id={`pills-${activeTab}`}
                role="tabpanel"
                tabIndex="0"
              >
                <h1>{genres.find((g) => g.id === activeTab)?.label}</h1>
                <div className="row genre_main_container">
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <div
                        key={movie.id}
                        className="col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                        onClick={() => handleMovieClick(movie)}
                      >
                        <MovieCard
                          image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                          title={movie.title}
                          rating={movie.vote_average.toFixed(1)}
                          year={new Date(movie.release_date).getFullYear()}
                        />
                      </div>
                    ))
                  ) : (
                    <p>Loading movies...</p>
                  )}
                </div>
              </div>
              <div className="pagination_container">
                <ul className="pagination">
                  <li
                    className={`page_item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="prev_btn"
                      onClick={() => handlePageChange(currentPage - 1, false)}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft />
                    </button>
                  </li>
                  {visiblePages.map((page) => (
                    <li
                      key={page}
                      className={`page_item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className={`page_btn ${
                          currentPage === page ? "active_btn" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  {currentPage < totalPages - 1 && (
                    <li className="page_item">
                      <button className="page_btn">...</button>
                    </li>
                  )}
                  {currentPage < totalPages && (
                    <li className="page_item">
                      <button
                        className="page_btn"
                        onClick={() => handlePageChange(totalPages)} // Normal page change, scrolls
                      >
                        {totalPages}
                      </button>
                    </li>
                  )}

                  <li
                    className={`page_item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="next_btn"
                      onClick={() => handlePageChange(currentPage + 1)} // Normal page change, scrolls
                      disabled={currentPage === totalPages}
                    >
                      <ArrowRight />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Genre;
