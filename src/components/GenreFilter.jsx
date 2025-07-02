import React, { useEffect, useState } from 'react'

export default function GenreFilter({ onSelectGenre }) {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchGenres = async () => {
            const url = "https://api.themoviedb.org/3/genre/movie/list?language=vi-VN";
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                },
            };
            const res = await fetch(url, options);
            const data = await res.json();
            setGenres(data.genres);
        }
        fetchGenres();
    }, [])
    return (
        <div className="flex flex-wrap gap-2 p-4 justify-center md:justify-start">
            {genres.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelectGenre(item.id)}
                    className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-sm md:text-base transition"
                >
                    {item.name}
                </button>
            ))}
        </div>

    )
}
