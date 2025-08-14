import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p className="muted">{movie.year}</p>

      <button
        className={isFavorite ? "remove-btn" : "fav-btn"}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? "❌ Remove" : "⭐ Add to Favorites"}
      </button>
    </div>
  );
}
