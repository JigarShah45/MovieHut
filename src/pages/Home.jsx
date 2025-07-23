import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = 'YOUR_API_KEY';

const popularKeywords = ["Avengers", "Batman", "Spider-Man", "Harry Potter", "Star Wars", "Matrix", "Mission Impossible", "Fast", "Transformers", "Jurassic"];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState(popularKeywords[0]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch movies from multiple popular keywords on mount
  useEffect(() => {
    fetchPopularMoviesMulti();
  }, []);

  // Fetch movies for all keywords and merge results
  const fetchPopularMoviesMulti = async () => {
    setLoading(true);
    let allMovies = [];
    for (let keyword of popularKeywords) {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Search) {
        allMovies = allMovies.concat(data.Search);
      }
    }
    setMovies(allMovies);
    setLoading(false);
    setHasMore(false); // No pagination for multi-keyword fetch
    setIsSearching(false);
  };

  // Fetch movies for a single keyword with pagination
  const fetchPopularMovies = async (keyword = currentKeyword, pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&page=${pageNum}&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Search) {
        setMovies(prev => append ? [...prev, ...data.Search] : data.Search);
        setHasMore(data.totalResults && (pageNum * 10 < parseInt(data.totalResults)));
      } else {
        if (!append) setMovies([]);
        setHasMore(false);
      }
    } catch (err) {
      if (!append) setMovies([]);
      setHasMore(false);
    }
    setLoading(false);
    setIsSearching(false);
  };

  // Handle search with pagination
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setPage(1);
    setCurrentKeyword(search);
    setIsSearching(true);
    fetchPopularMovies(search, 1, false);
  };

  // Load more results for current search or keyword
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPopularMovies(currentKeyword, nextPage, true);
  };

  return (
    <div className="home p-4 max-w-7xl mx-auto">
      <div className="flex justify-center items-center mb-4 mt-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for a movie"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded w-full sm:w-auto">Search</button>
        </form>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.length > 0 ? (
              movies.map(movie => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))
            ) : (
              <div className="text-center col-span-full">No movies found.</div>
            )}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button onClick={handleLoadMore} className="bg-gray-800 text-white px-6 py-2 rounded shadow">Load More</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
