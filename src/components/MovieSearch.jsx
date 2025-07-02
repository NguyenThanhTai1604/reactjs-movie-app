import MovieCard from "./MovieCard";


export default function MovieSearch({ title, data }) {

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.map((item) => (
            <MovieCard movie={item} />
          ))}
      </div>
    </div>
  );
}
