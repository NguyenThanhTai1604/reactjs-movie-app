import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import IconPlay from "../assets/play-button.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Banner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  return (
    <div
      className="w-full h-auto bg-center bg-no-repeat bg-cover bg-banner relative transition-all duration-700"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
      }}
    >
      <div className="absolute w-full h-full top-0 left-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 md:space-x-10">

        <div className="flex-1 flex flex-col space-y-5">
          <p className="text-white bg-gradient-to-r from-red-600 to-red-300 py-1 px-3 text-sm inline-block w-max rounded">
            {currentMovie.media_type === "tv" ? "TV Show" : "Movie"}
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            {currentMovie.title || currentMovie.name}
          </h2>

          <div className="flex items-center space-x-2">
            {[...Array(Math.floor(currentMovie.vote_average / 2))].map((_, i) => (
              <img key={i} src={IconRating} className="w-6 h-6" />
            ))}
            {currentMovie.vote_average % 2 >= 1 && (
              <img src={IconRatingHalf} className="w-6 h-6" />
            )}
          </div>

          <p className="text-white text-sm md:text-base line-clamp-4">
            {currentMovie.overview}
          </p>

          <div className="flex space-x-4">
            <Link to={`/movie/${currentMovie.id}`}>
              <button className="px-4 py-2 text-white bg-black font-bold text-sm rounded hover:bg-white hover:text-black transition">
                Chi tiết
              </button>
            </Link>
            <button className="px-4 py-2 text-white bg-red-600 font-bold text-sm rounded hover:bg-red-500 transition">
              Xem phim
            </button>
          </div>
        </div>


        <div className="flex-1 flex items-center justify-center">
          <div className="w-[280px] h-[380px] relative group cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              className="w-full h-full object-cover rounded shadow-lg"
              alt={currentMovie.title}
            />
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img src={IconPlay} alt="play" className="w-14 h-14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
