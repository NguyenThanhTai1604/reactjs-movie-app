import "./App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className=" h-full bg-black text-white min-h-screen pb-10 relative">
      <Header />
      <Banner />
      <MovieList title={"Phim Hot"} />
      <MovieList title={"Phim Đề Cử"} />
    </div>
  );
}

export default App;
