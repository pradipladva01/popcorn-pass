import React, { useState } from "react";
import "../styles/Home.css";
import { AsyncImage } from "loadable-image";
import PlaceHolderImg from "../resources/images/img_placeholder.png";

const MovieCard = ({ image, title, rating, year }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="movie_card">
      <div className="movie_img">
        {!isLoaded && !hasError && (
          <div
            style={{
              backgroundColor: "#8e8e8e26",
              borderRadius: "12px",
              width: "100%",
              height: "100%",
            }}
          >
          </div>
        )}
        <AsyncImage
          src={hasError || !image ? PlaceHolderImg : image}
          alt={`${title} poster`}
          onLoad={() => setIsLoaded(true)} // Set isLoaded to true when image loads
          onError={handleError} // Set error state if image fails to load
          loader={
            <div
              style={{
                backgroundColor: "#8e8e8e26",
                borderRadius: "12px",
                width: "100%",
                height: "100%",
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
