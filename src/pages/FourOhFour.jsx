import React from "react";
import cuate from "../resources/images/cuate.svg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UsePageTitle from "../components/UsePageTitle";

const FourOhFour = () => {
  const navigate = useNavigate();
  UsePageTitle("404 Not Found | PopcornPass - Movie Central");
  return (
    <>
      <section className="FourOhFour">
        <div className="container h-100">
          <div className="row h-100">
            <div className="four_oh_four_main">
              <img src={cuate} alt={cuate} />
              <button className="go_back_btn" onClick={() => navigate("/")}>
                {" "}
                <ArrowLeft /> Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FourOhFour;
