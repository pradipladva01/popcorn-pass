import React from "react";
import "../styles/Home.css"; // Import the custom CSS file

const Loader = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-border custom-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3 fs-4 fw-semibold custom-text">
        Popcorn<span>Pass</span>
      </div>
    </div>
  );
};

export default Loader;
