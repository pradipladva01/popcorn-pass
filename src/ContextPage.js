import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ContextPage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("Trending Movies");
  const [totalPage, setTotalPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const APIKEY = "1f57f80163b864834170816d01793bd3";

  useEffect(() => {
    if (page < 1) setPage(1);
  }, [page]);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoader(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&page=${page}`
        );
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPage(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchTrending();
  }, [page]);

  return (
    <ContextPage.Provider
      value={{
        movies,
        setMovies,
        page,
        setPage,
        header,
        setHeader,
        loader,
        setLoader,
        totalPage,
      }}
    >
      {children}
    </ContextPage.Provider>
  );
}

export default ContextPage;
