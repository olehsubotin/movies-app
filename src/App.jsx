import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { updateSearchCount, getTrendingMovies } from './appwrite';

import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMovieErrorMessage, setTrendingMovieErrorMessage] =
    useState(null);
  const [isTrendingMoviesLoading, setTrendingMoviesLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchedTerm] = useState(searchTerm);

  const fetchTrendingMovies = async () => {
    setTrendingMovieErrorMessage(null);
    setTrendingMoviesLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
      setTrendingMovieErrorMessage(
        'Failed to fetch trending movies. Please try again later.'
      );
    } finally {
      setTrendingMoviesLoading(false);
    }
  };

  useDebounce(() => setDebouncedSearchedTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = query
        ? `${API_URL}search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Network response was not ok, failed to fetch movies');
      }

      const data = await response.json();

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src='./hero.png' alt='Hero banner' />
            <h1>
              Find <span className='text-gradient'>Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className='trending'>
            <h2>Trending Movies</h2>
            {isTrendingMoviesLoading ? (
              <Spinner />
            ) : trendingMovieErrorMessage ? (
              <p className='text-red-500'>{trendingMovieErrorMessage}</p>
            ) : trendingMovies.length === 0 ? (
              <p>No trending movies found.</p>
            ) : (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      onError={(e) => {
                        e.target.src = 'no-movie.png';
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className='all-movies'>
            <h2 className='mt-[40px]'>All movies</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
