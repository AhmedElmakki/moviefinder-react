import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { searchMovies } from '../services/omdb'; // renamed file for clarity

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [error, setError] = useState('');

  const handleSearch = async (q) => {
    setQuery(q);
    if (!q) {
      setMovies([]);
      return;
    }
    setStatus('loading');
    setError('');

    try {
      const data = await searchMovies(q);

      if (data.Response === 'True') {
        setMovies(data.Search || []);
        setStatus('done');
      } else {
        setMovies([]);
        setStatus('done');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setStatus('error');
    }
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      {status === 'loading' && <Spinner />}
      {status === 'error' && <p className="error">{error}</p>}
      {status !== 'loading' && <MovieList movies={movies} />}
    </div>
  );
}
