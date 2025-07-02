import { useContext, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";
import { MovieContext, MovieProvider } from "../context/MovieProvider";
import GenreFilter from "../components/GenreFilter";
import Footer from "../components/Footer";

function Home() {

    const { movieSearch, handleSearch, movies, movieRate } = useContext(MovieContext)
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleGenreSelect = async (genreId) => {
        setFilteredMovies([])
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=vi-VN&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
        };
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        setFilteredMovies(data.results);
    }





    return (

        <div className="h-full bg-black text-white min-h-screen pb-10 pt-20 relative">
            <Header onSearch={handleSearch} />
            <Banner movies={movies} />
            <GenreFilter onSelectGenre={handleGenreSelect} />

            {movieSearch.length > 0 ? (
                <MovieSearch title="Kết quả tìm kiếm" data={movieSearch} />
            ) : filteredMovies.length > 0 ? <MovieList title={"Phim theo thể loại"} data={filteredMovies} /> :
                (
                    <>
                        <MovieList title="Phim Hot" data={movies} />
                        <MovieList title="Phim Đề Cử" data={movieRate} />
                    </>
                )}
            <Footer />
        </div>

    );
}

export default Home;
