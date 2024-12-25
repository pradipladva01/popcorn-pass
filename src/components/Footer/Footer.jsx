import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="footer_main">
              <h6>PopcornPass Copyright © {new Date().getFullYear()}</h6>
              <ul>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                |
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                |
                <li>
                  <Link to="/terms-condition">Terms & conditions</Link>
                </li>
                |
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
