import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '8df7c926';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setMovie(null);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie || movie.Response === 'False') return <div>Movie not found.</div>;

  // Helper: YouTube trailer search link
  const trailerSearchUrl = movie.Title
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' trailer')}`
    : null;

  return (
    <>
      <div className="movie-details max-w-2xl mx-auto p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center break-words">{movie.Title}</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : ''}
            alt={movie.Title}
            className="mb-4 md:mb-0 w-full max-w-xs md:max-w-[16rem] rounded object-cover"
          />
          <div className="flex-1 space-y-2">
            <p><strong>Release Date:</strong> {movie.Released}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="mb-2"><strong>Plot:</strong> {movie.Plot}</p>
          {trailerSearchUrl && (
            <a href={trailerSearchUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 underline">Watch Trailer on YouTube</a>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
