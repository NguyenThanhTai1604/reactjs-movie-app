import { createContext, useEffect, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const MovieContext = createContext();
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [movieSearch, setMovieSearch] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      };
      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      setTrailerKey(data.results[0].key);
      setModalIsOpen(true);
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };

  const handleSearch = async (searchVal) => {
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      };

      const url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=vi-US&page=1`;
      const url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=vi-US&page=1`;

      const [res1, res2] = await Promise.all([fetch(url1, options), fetch(url2, options)]);
      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovies(data1.results);
      setMovieRate(data2.results);
    };

    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ handleTrailer, movieSearch, handleSearch, movies, movieRate }}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>

    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
