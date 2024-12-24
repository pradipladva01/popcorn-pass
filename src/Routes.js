import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { retry } from "./utils/CommonFunctions";
import MovieDetails from "./pages/MovieDetails";
import FourOhFour from "./pages/FourOhFour";
import TermsAndCondition from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DownloadOne from "./pages/DownloadOne";
import DownloadTwo from "./pages/DownloadTwo";
const Home = lazy(() => retry(() => import("./pages/Home")));
const SearchResults = lazy(() => retry(() => import("./pages/SearchResults")));

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/search/:query",
      element: <SearchResults />,
    },
    {
      path: "/movie/:slug/:id",
      element: <MovieDetails />,
    },
    {
      path: "/terms-condition",
      element: <TermsAndCondition />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/movie/:slug/:id/download-one",
      element: <DownloadOne />,
    },
    {
      path: "/movie/:slug/:id/download-two",
      element: <DownloadTwo />,
    },
    {
      path: "404",
      element: <FourOhFour />,
    },
    {
      path: "/*",
      element: <Navigate replace to="/404" />,
    },
  ]);
  return routes;
};

export default Routes;
