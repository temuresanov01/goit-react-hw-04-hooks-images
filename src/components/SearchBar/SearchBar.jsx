import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

function SearchBar({ submit }) {
  const [searchbar, setSearchbar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(searchbar);
    reset();
  };
  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setSearchbar(value);
  };

  const reset = () => {
    setSearchbar("");
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <SearchIcon width="20" height="20" />
          <span className={s.SearchFormButtonLabel}></span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          name="searchbar"
          value={searchbar}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SearchBar;
