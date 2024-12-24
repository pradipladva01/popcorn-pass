import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer class="footer_section">
        <div class="container">
          <div class="row">
            <div class="footer_main">
              <h6>PopcornPass Copyright © {new Date().getFullYear()}</h6>
              <ul>
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
}

export default Footer
