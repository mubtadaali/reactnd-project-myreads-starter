import { Link } from "react-router-dom";
import React, {Component} from 'react';

import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allBooks: [],
            currentlyReadingIDs: [],
            wantToReadIDs: [],
            readIDs: [],
        };
    }

    getCategoryBooks() {
        const {allBooks, currentlyReadingIDs, wantToReadIDs, readIDs} = this.state;
        return {
            currentlyReading: allBooks.filter(book => currentlyReadingIDs.includes(book.id)),
            wantToRead: allBooks.filter(book => wantToReadIDs.includes(book.id)),
            read: allBooks.filter(book => readIDs.includes(book.id))
        };
    }

    getAllBooks() {
        let context = this;
        BooksAPI.getAll().then(
            function(books){
                context.setState({
                    allBooks: books,
                    currentlyReadingIDs: books.filter((b) => b.shelf === "currentlyReading").map(b => b.id),
                    wantToReadIDs: books.filter((b) => b.shelf === "wantToRead").map(b => b.id),
                    readIDs: books.filter((b) => b.shelf === "read").map(b => b.id)
                });
            });
    }

    componentDidMount() {
        this.getAllBooks();
    }

    handleShelfChange(book, newShelf) {
        let context = this;
        const newBooks = this.state.allBooks.map((b) => {
            return (b.id === book.id)? { ...b, shelf: newShelf }: b;
        });

        BooksAPI.update(book, newShelf).then( res => context.setState({
            allBooks: newBooks,
            currentlyReadingIDs: res.currentlyReading,
            wantToReadIDs: res.wantToRead,
            readIDs: res.read,
        }) );
    }

    render() {
        const {currentlyReading, wantToRead, read} = this.getCategoryBooks();

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { currentlyReading.map(
                                        (book) =>
                                            <Book key={book.id} book={book}
                                                  onShelfChange={(book, shelf)=>this.handleShelfChange(book, shelf)}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { wantToRead.map(
                                        (book) =>
                                            <Book key={book.id} book={book}
                                                  onShelfChange={(book, shelf)=>this.handleShelfChange(book, shelf)}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { read.map(
                                        (book) =>
                                            <Book key={book.id} book={book}
                                                  onShelfChange={(book, shelf)=>this.handleShelfChange(book, shelf)}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={{ pathname: "/search", state: this.state }}>
                        Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;
