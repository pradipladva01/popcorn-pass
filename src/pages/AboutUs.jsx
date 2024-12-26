import React, { useState } from "react";
import NoData from "../resources/images/no_data.svg";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import UsePageTitle from "../components/UsePageTitle";

const AboutUs = () => {
  const navigate = useNavigate();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [header, setHeader] = useState("");
  const [query, setQuery] = useState("");
  UsePageTitle("About Us | PopcornPass - Movie Central");

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

      {query?.trim() && searchedMovies.length === 0 ? (
        <div className="movie_details">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="no_data_found">
                  <img src={NoData} alt="No Data Found" />
                  <h5>No data found</h5>
                  <p>
                    Sorry, we couldn’t find any matches for your search. Try
                    refining your query or explore our popular movies and
                    genres!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : query?.trim() && searchedMovies.length > 0 ? (
        <section className="movie_list">
          <div className="container">
            <div className="row">
              <h1>{header}</h1>
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
        <section className="about_us_container">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="about_main">
                  <div className="intro_section">
                    <h1>Welcome to PopcornPass</h1>
                    <p>
                      Every great story begins with an idea, a spark that
                      ignites the passion to bring something extraordinary into
                      the world. For us, that idea was to create a platform that
                      celebrates the magic of movies.
                    </p>
                  </div>

                  <div className="founding_story">
                    <h2>The Beginning</h2>
                    <p>
                      Once upon a time, in a small office filled with movie
                      posters, popcorn, and an unhealthy obsession with
                      cinematic storytelling, a group of movie lovers came
                      together. They had one simple goal: make the movie-going
                      experience better.
                    </p>
                    <p>
                      They realized that in today’s fast-paced world, finding
                      the perfect movie at the right time and at a great price
                      should never be a challenge. And so, PopcornPass was born.
                      The name itself was inspired by those magical moments when
                      a perfect movie night was accompanied by the irresistible
                      crunch of popcorn.
                    </p>
                    <p>
                      From humble beginnings, we set out on a mission to give
                      movie-goers an experience that was seamless, exciting, and
                      unforgettable. With a combination of technology, movie
                      magic, and a little bit of luck, we began developing the
                      platform you know today.
                    </p>
                  </div>

                  <div className="our_mission">
                    <h2>Our Mission</h2>
                    <p>
                      Our mission is simple yet powerful: **to connect movie
                      lovers with the stories they adore.** Whether it's a
                      blockbuster film or an indie gem, we believe that every
                      story deserves an audience, and we want to make it easier
                      for everyone to discover, enjoy, and celebrate the art of
                      cinema.
                    </p>
                  </div>

                  <div className="the_popcornpass_experience">
                    <h2>The PopcornPass Experience</h2>
                    <p>
                      At PopcornPass, we’ve designed the platform with you in
                      mind—whether you’re a casual viewer or a hardcore
                      cinephile. We want every moment of your movie journey to
                      be special.
                    </p>
                    <ul>
                      <li>
                        <strong>Quick and Easy Access:</strong> Find showtimes,
                        theaters, and movies in just a few clicks.
                      </li>
                      <li>
                        <strong>Exclusive Offers:</strong> Enjoy special
                        discounts and offers on movie tickets.
                      </li>
                      <li>
                        <strong>Personalized Recommendations:</strong> Get movie
                        suggestions based on your preferences and past views.
                      </li>
                      <li>
                        <strong>Seamless Integration:</strong> From booking
                        tickets to grabbing your popcorn, we aim to simplify
                        every step.
                      </li>
                    </ul>
                  </div>

                  <div className="why_us">
                    <h2>Why PopcornPass?</h2>
                    <p>
                      Why choose PopcornPass over the other options? It's
                      simple. We're not just another ticketing platform. We're a
                      community of movie lovers. We believe in creating
                      memorable experiences for movie-goers and helping people
                      discover stories that will move them.
                    </p>
                    <p>
                      In an industry filled with complex interfaces and endless
                      ads, PopcornPass strives to make your movie experience
                      straightforward, fast, and fun.
                    </p>
                  </div>

                  <div className="the_journey_continues">
                    <h2>The Journey Continues</h2>
                    <p>
                      But our story doesn’t end here. We are constantly
                      evolving. The world of cinema is ever-changing, and we are
                      dedicated to staying at the forefront, bringing new
                      features and innovations that enhance your movie-going
                      experience.
                    </p>
                    <p>
                      Join us as we continue to grow, learn, and shape the
                      future of the movie industry together. There’s always room
                      for more in the PopcornPass family!
                    </p>
                  </div>

                  <div className="stay_connected">
                    <h2>Stay Connected</h2>
                    <p>
                      We would love for you to be a part of our journey! Follow
                      us on social media, subscribe to our newsletter, and stay
                      tuned for upcoming features and exclusive offers. Let's
                      make every movie night unforgettable!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default AboutUs;
