import React from "react";
import UsePageTitle from "../components/UsePageTitle";

const PrivacyPolicy = () => {
  UsePageTitle("Privacy Policy | PopcornPass - Movie Central");
  return (
    <>
      <section class="terms_section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="terms_content">
                <h1>Privacy Policy</h1>
                <p>
                  Your privacy is important to us at PopcornPass. This Privacy
                  Policy explains how we collect, use, and protect your
                  information when you use our website and services.
                </p>

                <h2>Introduction</h2>
                <p>
                  Your privacy is important to us at PopcornPass. This Privacy
                  Policy explains how we collect, use, and protect your
                  information when you use our website and services.
                </p>

                <h2>1. Information We Collect</h2>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> When you create an
                    account or interact with our services, we may collect
                    personal details such as your name, email address, and
                    preferences.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> We automatically
                    collect data such as your IP address, browser type, and
                    device information for analytics and troubleshooting.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies to enhance your
                    user experience and gather insights into how our services
                    are used.
                  </li>
                </ul>

                <h2>2. How We Use Your Data</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide and improve our services.</li>
                  <li>
                    Customize your experience and deliver personalized content.
                  </li>
                  <li>
                    Send important updates and promotional materials (if you opt
                    in).
                  </li>
                  <li>Analyze usage patterns and optimize our platform.</li>
                </ul>

                <h2>3. Sharing Your Data</h2>
                <p>
                  We do not sell your personal information. However, we may
                  share data with trusted partners or service providers to
                  operate our platform, such as payment processors or hosting
                  services.
                </p>

                <h2>4. Your Rights</h2>
                <ul>
                  <li>
                    You can access, update, or delete your personal data at any
                    time by contacting us.
                  </li>
                  <li>
                    You have the right to opt out of receiving promotional
                    communications.
                  </li>
                  <li>
                    You may request a copy of the personal data we hold about
                    you.
                  </li>
                </ul>

                <h2>5. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect
                  your data. While we strive to safeguard your information, no
                  system is completely secure, and we encourage you to use
                  caution when sharing personal information online.
                </p>

                <h2>6. Cookies and Tracking Technologies</h2>
                <p>
                  PopcornPass uses cookies to enhance your experience. You can
                  disable cookies through your browser settings, but some
                  features of the Service may not function properly as a result.
                </p>

                <h2>7. Children's Privacy</h2>
                <p>
                  PopcornPass does not knowingly collect data from children
                  under the age of 13. If you believe we have collected data
                  from a child, please contact us immediately.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with a revised "last
                  updated" date.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a href="mailto:support@popcornpass.com">
                    support@popcornpass.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
