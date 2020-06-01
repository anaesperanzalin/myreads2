import React from "react";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";


class SearchPage extends React.Component {
  state = {
    query: "",
    searchedBooks: [],
  };

  updateQuery = (query) => {
    this.setState({
      query: query,
    });
    this.updateSearchedBooks(query);
  };

  updateSearchedBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.error) 
          {this.setState({ searchedBooks: []})} 
        else {
          this.setState({searchedBooks: searchedBooks});
          }
        })
    } else {
      this.setState({searchedBooks:[]})
    }
      }
  

  render() {


    return (
      <div className="search-books">
        <div className="search-books-bar">  
          <Link 
          to="/myreads2/"
          className="close-search"> Close</Link>
    
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
            this.state.searchedBooks.map(searchedBook => {
              let shelf ="none";

              this.props.books.map(book => (
                book.id === searchedBook.id ?
                shelf = book.shelf : 
                ''
                ));

              return (
                <li key={searchedBook.id}>
                  <Book 
                  book ={searchedBook}
                  moveShelf={this.props.moveShelf}
                  currentShelf={shelf}
                  />
                </li>)
              

              
        })
        }
          </ol>
        </div>
      </div>
  ) 
}
}

export default SearchPage;
