import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

class SearchBar extends Component {
  state = {
    searchbar: "",
  };
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.searchbar);
    this.reset();
  };
  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ searchbar: "" });
  };

  render() {
    const { searchbar } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <SearchIcon width="20" height="20" />
            <span className={s.SearchFormButtonLabel}></span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="searchbar"
            value={searchbar}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
