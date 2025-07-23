import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import logo from "./assets/logo-moviehut.png";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between shadow">
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-xl font-bold tracking-wide hover:underline cursor-pointer"
            style={{ textDecoration: 'none' }}
            end
          >
            <img src={logo} alt="MovieHut Logo" className="h-12 w-12 object-contain bg-white rounded shadow p-1" />
            MovieHut
          </NavLink>
        </div>
        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold px-2 py-1 rounded hover:bg-gray-800 transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-200'}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `font-semibold px-2 py-1 rounded hover:bg-gray-800 transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-200'}`
            }
          >
            Favorites
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <footer className="bg-gray-900 text-gray-300 py-4 mt-8 text-center shadow-inner">
        <span className="font-semibold">Made by Jigar Shah</span>
      </footer>
    </Router>
  );
}
