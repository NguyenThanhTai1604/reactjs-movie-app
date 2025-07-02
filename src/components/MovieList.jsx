// import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import MovieCard from "./MovieCard";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 5,
  },
  laptop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

export default function MovieList({ title, data = [] }) {

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <Carousel responsive={responsive} className="flex items-center space-x-4">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <MovieCard movie={item} />
          ))}
      </Carousel>
    </div>
  );
}
