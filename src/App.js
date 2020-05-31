import React from "react";
import * as BooksAPI from "./BooksAPI";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";
import "./App.css";
import * as booksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

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

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  };

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />

        <Route
          path="/search"
          render={() => <SearchPage moveShelf={this.moveShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
