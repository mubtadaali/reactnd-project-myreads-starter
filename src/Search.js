import React, { Component } from 'react';
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import './App.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '', books: []
        };
    }

    setBookShelf(allBooks, categoryMap) {
        let { currentlyReadingIDs, wantToReadIDs, readIDs } = categoryMap;
        for (let i=0; i< allBooks.length; i++) {
            let book = allBooks[i];
            if (currentlyReadingIDs.includes(book.id)){
                book.shelf = "currentlyReading";
            }else if (wantToReadIDs.includes(book.id)){
                book.shelf = "wantToRead";
            }else if (readIDs.includes(book.id)){
                book.shelf = "read";
            }
        }
        return allBooks;
    }

    handleSearchInputChange(event) {
        this.setState({query: event.target.value});
        this.searchBooks(event.target.value);
    }

    searchBooks(query) {
        const context = this;
        BooksAPI.search(query).then(
            function (updatedBooks) {
                let books = updatedBooks.items || updatedBooks;
                const allBooks = context.setBookShelf(books, context.props.location.state);
                context.setState({ books: allBooks });
            }
        );

    }

    handleShelfChange(book, newShelf) {
        const context = this;
        BooksAPI.update(book, newShelf).then(
            function (response) {
                let { currentlyReading, wantToRead, read } = response;
                const categoryMap = { currentlyReadingIDs: currentlyReading, wantToReadIDs: wantToRead, readIDs: read};
                const allBooks = context.setBookShelf(context.state.books, categoryMap);
                context.setState({books: allBooks});
            }
        );
    }

    render() {
      return (
          <div className="search-books">
              <div className="search-books-bar">
                  <Link className="close-search" to="/">
                      Close
                  </Link>
                  <div className="search-books-input-wrapper">
                      <input type="text" placeholder="Search by title or author"
                             onChange={event => this.handleSearchInputChange(event)} />
                  </div>
              </div>
              <div className="search-books-results">
                  <ol className="books-grid">
                      { this.state.books.map(
                          (book) => <Book key={book.id} book={book}
                                          onShelfChange={(book, shelf) => this.handleShelfChange(book, shelf)}/>)
                      }
                  </ol>
              </div>
          </div>
      )
  }
}

export default Search;
