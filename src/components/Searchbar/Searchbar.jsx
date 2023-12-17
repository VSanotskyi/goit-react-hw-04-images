import {useState} from 'react';

export default function Searchbar({setKeyWord, setPage}) {
  const [search, setSearch] = useState('');

  const handleChange = ({target: {value}}) => {
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setKeyWord(search);
    setPage(1)
    setSearch('');
  };

  return (
    <header className="searchbar">
      <form onSubmit={(event) => handleSubmit(event)}
            className="form"
      >
        <button type="submit"
                className="button"
        >
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchWorld"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
