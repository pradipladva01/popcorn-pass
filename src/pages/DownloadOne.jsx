import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AsyncImage } from "loadable-image";
import PlaceHolderImg from "../resources/images/backdrop_placeholder.png";
import slugify from "slugify";
import UsePageTitle from "../components/UsePageTitle";

const DownloadOne = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [buttonText, setButtonText] = useState("Please Wait...");
  const [showNotRobotButton, setShowNotRobotButton] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const notRobotRef = useRef(null);
  UsePageTitle("Download | PopcornPass - Movie Central");

  useEffect(() => {
    const storedClickCount = parseInt(localStorage.getItem("clickCount"), 10);
    if (!isNaN(storedClickCount)) {
      setClickCount(storedClickCount);
    }
  }, []);

  useEffect(() => {
    if (movie) {
      setLoading(true);
      axios
        .get("https://dummyjson.com/products?limit=30&skip=0")
        .then((response) => {
          setProducts(response.data.products);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
  }, [movie]);

  useEffect(() => {
    setCountdown(10);
    setButtonText("Please Wait...");
    setShowNotRobotButton(false);
  }, []);

  useEffect(() => {
    let timer;
    if (movie && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setButtonText("I'm not a robot");
    }

    return () => clearInterval(timer);
  }, [movie, countdown]);

  // const handleGenerateLinkClick = () => {
  //   const newClickCount = clickCount + 1;
  //   setClickCount(newClickCount);
  //   localStorage.setItem("clickCount", newClickCount);

  //   const isEvenClick = newClickCount % 2 === 0;

  //   if (isEvenClick) {
  //     window.open("https://pradipladva.in", "_blank", "noopener noreferrer");
  //   } else {
  //     if (movie && movie.title && movie.id) {
  //       const slug = slugify(movie.title, { lower: true });
  //       navigate(`/movie/${slug}/${movie.id}/download-two`, {
  //         state: {
  //           movie,
  //         },
  //       });
  //     }
  //   }
  // };
  const handleGenerateLinkClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    localStorage.setItem("clickCount", newClickCount);

    if (movie && movie.title && movie.id) {
      const slug = slugify(movie.title, { lower: true });
      navigate(`/movie/${slug}/${movie.id}/download-two`, {
        state: {
          movie,
        },
      });
    }
  };

  const handleShowNotRobotButton = () => {
    if (countdown === 0) {
      setShowNotRobotButton(true);
      setTimeout(() => {
        notRobotRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <section className="download_one_main">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="download_one">
              {movie ? (
                <>
                  <p className="main_p">
                    Please Wait {countdown > 0 ? countdown : "0"} Seconds.
                  </p>
                  <button
                    className="not_robot"
                    onClick={handleShowNotRobotButton}
                    disabled={countdown > 0}
                  >
                    {buttonText}
                  </button>
                  {loading ? (
                    <div className="loading_movie">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <div className="dummy_box_main">
                      {products.map((product, index) => (
                        <div className="dummy_box" key={index}>
                          <div className="dummy_box_left">
                            <AsyncImage
                              src={product.images || PlaceHolderImg}
                              alt={`Product ${index + 1}`}
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
                          <div className="dummy_box_right">
                            <h5>{product.title}</h5>
                            <p>{product.description}</p>
                            <div className="tags_main">
                              {product?.tags?.map((tag, index) => (
                                <div key={index} className="tag">
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {showNotRobotButton && (
                    <div
                      className="robot_verification"
                      style={{ marginTop: "20px" }}
                      ref={notRobotRef}
                    >
                      <button
                        className="not_robot"
                        onClick={handleGenerateLinkClick}
                      >
                        Generate Link
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="loading_movie">
                  <div className="spinner-border" role="status"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadOne;
