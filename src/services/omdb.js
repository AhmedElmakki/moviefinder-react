const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
  if (!query?.trim()) return [];

  const url = `${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();

  if (data.Response === 'False') return [];

  // Map OMDb's fields to your app's expected fields
  return data.Search.map(m => ({
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster
  }));
}

export async function getMovieDetails(id) {
  const url = `${BASE}?apikey=${API_KEY}&i=${id}&plot=full`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Failed to fetch movie details');
  const data = await res.json();

  if (data.Response === 'False') throw new Error('Movie not found');

  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster,
    genre: data.Genre,
    runtime: data.Runtime,
    rating: data.imdbRating,
    plot: data.Plot,
    cast: data.Actors
  };
}

export function posterUrl(poster) {
  return poster !== 'N/A' ? poster : null;
}
