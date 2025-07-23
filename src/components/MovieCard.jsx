import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFav(favs.some(f => f.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  function onfavClick(e) {
    e.preventDefault();
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFav) {
      favs = favs.filter(f => f.imdbID !== movie.imdbID);
    } else {
      favs.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFav(!isFav);
  }

  return (
    <div className="movie-card bg-white rounded shadow p-2 flex flex-col h-full">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="movie-poster mb-2 flex justify-center items-center">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : ''}
            alt={movie.Title}
            className="w-full max-w-xs h-64 sm:h-56 md:h-64 object-cover rounded mx-auto"
            style={{ minHeight: '12rem' }}
          />
        </div>
      </Link>
      <div className="movie-info flex-1 text-center">
        <h3 className="text-lg font-semibold break-words">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Year}</p>
      </div>
      <div className="movie-overlay mt-2 flex justify-end">
        <button
          className={`favorite-btn text-xl ${isFav ? 'text-red-500' : 'text-gray-400'}`}
          onClick={onfavClick}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>
    </div>
  );
}

export default MovieCard;