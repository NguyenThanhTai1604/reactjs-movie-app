import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieProvider";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

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

      const respone = await fetch(url, options);
      const data = await respone.json();
      console.log(data);

      setMovieSearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      };
      const url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY
        }&language=vi-US&page=1`;
      const url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY
        }&language=vi-US&page=1`;

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();
      setMovie(data1.results);
      setMovieRate(data2.results);
    };

    fechMovie();
  }, []);

  return (
    <MovieProvider>
      <div className=" h-full bg-black text-white min-h-screen pb-10 pt-20 relative">
        <Header onSearch={handleSearch} />
        <Banner />
        {movieSearch.length > 0 ? (
          <MovieSearch title={"Phim Đề Cử"} data={movieSearch} />
        ) : (
          <>
            <MovieList title={"Phim Hot"} data={movie} />
            <MovieList title={"Phim Đề Cử"} data={movieRate} />
          </>
        )}
      </div>
    </MovieProvider>
  )
}

export default App;
