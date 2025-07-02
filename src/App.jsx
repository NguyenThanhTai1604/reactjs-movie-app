import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import { MovieProvider } from "./context/MovieProvider";
import Footer from "./components/Footer";
import { AuthProvider } from './context/AuthContext';
import Login from "./pages/Login";


function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </AuthProvider>
  )
}

export default App;
