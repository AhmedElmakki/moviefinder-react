import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getMovieDetails } from '../services/omdb';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = movie ? favorites.some((m) => m.id === movie.id) : false;

  useEffect(() => {
    setStatus('loading');
    setError('');
    getMovieDetails(id)
      .then((data) => { setMovie(data); setStatus('done'); })
      .catch((err) => { setError(err.message); setStatus('error'); });
  }, [id]);

  if (status === 'loading') return <Spinner />;
  if (status === 'error') return <p className="error">{error}</p>;
  if (!movie) return null;

  return (
    <div className="details container">
      <Link to="/" className="back">&larr; Back</Link>

      <div className="details__wrap">
        {movie.poster ? (
          <img className="details__poster" src={movie.poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="card__placeholder">No Poster</div>
        )}

        <div className="details__meta">
          <h1>{movie.title} <span className="muted">({movie.year})</span></h1>
          <p><strong>Genres:</strong> {movie.genres}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p className="details__overview">{movie.plot}</p>

          <button
            className={`fav fav--lg ${isFav ? 'fav--on' : ''}`}
            onClick={() => toggleFavorite(movie)}
            aria-pressed={isFav}
          >
            {isFav ? '★ In Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>

      {movie.cast.length > 0 && (
        <>
          <h2>Cast</h2>
          <ul className="cast">
            {movie.cast.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
