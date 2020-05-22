import React from "react";
import * as BooksAPI from "./BooksAPI";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import "./App.css";
import * as booksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
    console.log(this.state.books);
  }

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        <MainPage 
          books ={this.state.books}
        
        />
      </div>
    );
  }
}

export default BooksApp;
