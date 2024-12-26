import useWeb3forms from "@web3forms/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UsePageTitle from "../components/UsePageTitle";
import slugify from "slugify";
import NoData from "../resources/images/no_data.svg";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MovieCard from "../components/MovieCard";

const ContactUs = () => {
  const navigate = useNavigate();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [header, setHeader] = useState("");
  const [query, setQuery] = useState("");
  UsePageTitle("Contact Us | PopcornPass - Movie Central");

  const handleMovieClick = (movie) => {
    setQuery("");
    const slug = slugify(movie.title, { lower: true });
    navigate(`/movie/${slug}/${movie.id}`);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  const apiKey = "f0d6a5fa-24fb-4a33-bf8c-569b5cc51ab5";
  const { submit: onSubmit } = useWeb3forms({
    access_key: apiKey,
    settings: {
      from_name: "Pradip Ladva",
      subject: "New Contact Message from your pradip ladva",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
      toast.success(message || "Your message is on its way!");
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
      toast.error(msg);
    },
  });

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
        <section class="contact_section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="contact_main">
                  <h1>Contact Us</h1>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Explicabo, iure.
                  </p>

                  <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    method="POST"
                    autoComplete="off"
                  >
                    <div className="input-group">
                      <label for="name">
                        Name <span>*</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"
                        className={`input-field ${
                          errors.name
                            ? "error-border"
                            : touchedFields.name
                            ? "valid-border"
                            : ""
                        }`}
                        {...register("name", {
                          required: "Name is required",
                          maxLength: 80,
                        })}
                      />
                      {errors.name && (
                        <div className="mt-1 error">
                          <small>{errors.name.message}</small>
                        </div>
                      )}
                    </div>
                    <div className="input-group">
                      <label for="name">
                        Email <span>*</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email *"
                        className={`input-field ${
                          errors.email
                            ? "error-border"
                            : touchedFields.email
                            ? "valid-border"
                            : ""
                        }`}
                        {...register("email", {
                          required: "Enter your email",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="mt-1 error">
                          <small>{errors.email.message}</small>
                        </div>
                      )}
                    </div>
                    <div className="input-group">
                      <label for="name">
                        Description <span>*</span>
                      </label>
                      <textarea
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Your Message *"
                        className={`input-field ${
                          errors.message
                            ? "error-border"
                            : touchedFields.message
                            ? "valid-border"
                            : ""
                        }`}
                        {...register("message", {
                          required: "Enter your Message",
                        })}
                      />
                      {errors.message && (
                        <div className="mt-1 error">
                          <small>{errors.message.message}</small>
                        </div>
                      )}
                    </div>
                    {!isSuccess ? (
                      <button type="submit" className="button-01">
                        {isSubmitting ? "Please wait..." : "Send request"}
                      </button>
                    ) : (
                      <button type="button" className="button-01">
                        <h3>Thank You!</h3>
                      </button>
                    )}
                  </form>
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

export default ContactUs;
