import React, { useContext, useEffect, useState } from 'react'
import ImgTemp from '../assets/temp-1.jpeg'
import Header from "../components/Header";

import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import MovieSearch from '../components/MovieSearch';
import { MovieContext, MovieProvider } from '../context/MovieProvider';
import Footer from '../components/Footer';

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);

    const { movieSearch, handleSearch, movies, movieRate } = useContext(MovieContext)




    useEffect(() => {
        const fetchMovie = async () => {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=vi-VN`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                },
            };
            const res = await fetch(url, options);
            const data = await res.json();
            setMovie(data);

        }
        fetchMovie();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);



    if (!movie) return <div className='text-white p-4'>Đang tải...</div>

    return (


        <div className="h-full bg-black text-white min-h-screen pb-10 pt-20 relative">
            <Header onSearch={handleSearch} />
            <div
                className="text-white p-6 min-h-screen bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >

                <div className="absolute inset-0 bg-black/70"></div>


                <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">

                    <div className="flex-shrink-0">
                        <img
                            className="rounded-lg w-full max-w-xs mx-auto md:mx-0 shadow-lg"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>


                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                        <p className="mb-4 leading-relaxed text-gray-300">{movie.overview}</p>
                        <p className="mb-2">
                            <strong>Ngày phát hành:</strong> {movie.release_date}
                        </p>
                        <p className="mb-4">
                            <strong>Điểm đánh giá:</strong> {movie.vote_average}
                        </p>
                        <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 font-semibold shadow">
                            🎬 Xem phim
                        </button>
                    </div>
                </div>
            </div>


            {movieSearch.length > 0 ? (
                <MovieSearch title="Kết quả tìm kiếm" data={movieSearch} />
            ) : (
                <>
                    <MovieList title="Phim Hot" data={movies} />
                    <MovieList title="Phim Đề Cử" data={movieRate} />
                </>
            )}

            <Footer />
        </div>




    )
}
