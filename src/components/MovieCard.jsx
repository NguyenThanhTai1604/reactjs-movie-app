import React from 'react'
import { MovieContext } from "../context/MovieProvider";
import { useContext } from "react";
import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
    const { handleTrailer } = useContext(MovieContext);
    return (
        <div
            key={movie.id}
            className="w-[200px] h-[280px] relative group p-2"
        >
            <button onClick={() => handleTrailer(movie.id)} className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded z-10 opacity-80 hover:opacity-100">▶ Trailer</button>
            <Link to={`/movie/${movie.id}`} key={movie.id} className="w-[200px] h-[280px] relative group block" >
                <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
                    <img
                        src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                        alt="{movie.title}"
                        className="w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center movies-center text-center p-2">
                        <p className="text-sm mb-2 font-semibold">{movie.title}</p>
                        <p className="text-yellow-400 text-xs">
                            ⭐ {movie.vote_average?.toFixed(1) || "?"}/10
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
