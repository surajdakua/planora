import { useState, useEffect } from "react";
import "./Search.css";

const Search = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (sug) => {
    setQuery(sug.display_name);
    setSuggestions([]);
    onLocationSelect({
      lat: parseFloat(sug.lat),
      lon: parseFloat(sug.lon),
      display_name: sug.display_name,
    });
  };

  return (
    <div className="search-container">
      <div className="search-inner">
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <input
            type="text"
            value={query}
            placeholder="Search a place..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button disabled={loading}>Search</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((sug) => (
              <li
                key={sug.place_id}
                className="suggestion-item"
                onClick={() => handleSelect(sug)}
              >
                {sug.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;