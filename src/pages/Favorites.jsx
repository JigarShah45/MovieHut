import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  return (
    <div className="favorites p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Favorite Movies</h2>
      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))
        ) : (
          <div className="text-center col-span-full">No favorites yet.</div>
        )}
      </div>
    </div>
  );
};

export default Favorites;