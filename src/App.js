import React, { Suspense } from "react";
import Routes from "./Routes";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "./components/Loader";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
      <Analytics />
    </>
  );
}

export default App;
