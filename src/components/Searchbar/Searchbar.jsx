import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";

 class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: "",
  };
  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value.toLowerCase() });
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.resetState();
  };
  
  resetState = () => {
    this.setState({ value: "" });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;


