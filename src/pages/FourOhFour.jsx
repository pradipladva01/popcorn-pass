import React from "react";
import cuate from "../resources/images/cuate.svg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FourOhFour = () => {
  const navigate = useNavigate();
  return (
    <>
      <section class="FourOhFour">
        <div class="container h-100">
          <div class="row h-100">
            <div class="four_oh_four_main">
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
