import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch, initialQuery = '' }) {
  const [q, setQ] = useState(initialQuery);

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form className="search" onSubmit={submit} role="search" aria-label="Search movies">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search movies (e.g., Oppenheimer)"
        className="search__input"
        aria-label="Search movies"
      />
      <button className="search__btn" type="submit">Search</button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  initialQuery: PropTypes.string
};
