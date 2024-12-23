import React from "react";
import "../styles/Home.css";
import { AsyncImage } from "loadable-image";

const MovieCard = ({ image, title, rating, year }) => {
  return (
    <div className="movie_card">
      <div className="movie_img">
        <AsyncImage
          src={image}
          alt={`${title} poster`}
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
      <div className="movie_info">
        <h2 className="movie_title">{title}</h2>
        <div className="movie_rating">
          {rating} - {year}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
