import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./SearchBar.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

 class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
//локальный state. храним пока набираем инпут
  state = {
    searchQuery: "",
   };
   
  handleChange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
   };
  
  //когда отправляем запрос по Submit. очистка формы. не отправляем пустую сторку
  handleSubmit = (event) => {
    event.preventDefault();
//нет рендера картинок при пробеле если trim
    if (this.state.searchQuery.trim() === '') { 
     return toast.error("Enter search query");
    }

    this.props.onSubmit(this.state.searchQuery);
    //очиста формы сразу после Submit 
    this.setState({ searchQuery: "" });
    
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
            autoComplete="off"
            autoFocus
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


