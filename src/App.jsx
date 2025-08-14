import React, { useState } from "react";
import MovieList from "./components/MovieList";
import { useFavorites } from "./context/FavoritesContext";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { favorites } = useFavorites();

  const searchMovies = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=8b4cfbc1&s=${query}`);
      const data = await res.json();
      if (data.Response === "True") {
        // Convert OMDb data to your movie format
        setMovies(
          data.Search.map((m) => ({
            id: m.imdbID,
            title: m.Title,
            year: m.Year,
            poster: m.Poster,
          }))
        );
      } else {
        setError(data.Error);
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <h1>🎬 MovieFinder</h1>

        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {error && <p className="muted">{error}</p>}

        <h2>Search Results</h2>
        <MovieList movies={movies} />

        <h2>⭐ Favorites</h2>
        {favorites.length > 0 ? (
          <MovieList movies={favorites} />
        ) : (
          <p className="muted">No favorites yet.</p>
        )}

        <footer>
          <p>Data from <a href="https://www.omdbapi.com/">OMDb API</a></p>
          <p>© {new Date().getFullYear()} MovieFinder. Built by Ahmed Elmakki 22011502.</p>
        </footer>
      </div>
    </>
  );
}
