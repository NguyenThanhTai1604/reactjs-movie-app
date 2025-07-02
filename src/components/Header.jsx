import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ onSearch }) {
  const [textSearch, setTextSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e || !e.target) return;
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside());
    return () => document.removeEventListener("mousedown", handleClickOutside())

  }, [])
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black px-4 py-3 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <h1 className="text-2xl uppercase font-extrabold text-red-600 tracking-wider">
              Movie
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-white hover:text-red-500 transition">Home</Link>
            <a href="#" className="text-white hover:text-red-500 transition">About</a>
            <a href="#" className="text-white hover:text-red-500 transition">Contact</a>
          </nav>

          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Search + Avatar */}
        <div className="flex items-center gap-3 relative">
          <div className="flex items-center gap-2 bg-white rounded px-2 py-1">
            <input
              type="text"
              placeholder="Search"
              className="text-black text-sm w-[120px] sm:w-[160px] md:w-[200px] focus:outline-none"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
            />
            <Link to="/">
              <button
                onClick={() => onSearch(textSearch)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 text-sm transition"
              >
                Search
              </button>
            </Link>
          </div>

          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                title={currentUser.name}
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full border border-gray-300 hover:scale-105 transition duration-200 cursor-pointer object-cover"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40 py-2 text-sm z-50">
                  <div className="px-4 py-2 font-semibold truncate border-b border-gray-200">
                    👤 {currentUser.name || "User"}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="text-sm text-white px-3 py-1 rounded border border-white hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      {showMenu && (
        <nav className="md:hidden mt-2 flex flex-col gap-2 px-4 text-white">
          <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
          <a href="#" onClick={() => setShowMenu(false)}>About</a>
          <a href="#" onClick={() => setShowMenu(false)}>Contact</a>
        </nav>
      )}
    </header>

  );
}
