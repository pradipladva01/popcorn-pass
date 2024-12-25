import React from "react";
import { useLocation } from "react-router-dom";

const DownloadThree = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  return (
    <>
      {movie && (
        <section className="download_one_main">
          <h1 style={{ color: "white", textAlign: "center" }}>
            congratulations
          </h1>
        </section>
      )}
    </>
  );
};

export default DownloadThree;
