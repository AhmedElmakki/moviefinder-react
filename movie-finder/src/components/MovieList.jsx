import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  if (!movies?.length) {
    return <p className="muted">No movies found. Try another search.</p>;
  }

  return (
    <section className="grid">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </section>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
