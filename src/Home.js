import React, {Component} from 'react';
import { Link } from "react-router-dom";

import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            read: []
        };
    }

    getAllBooks() {
        let context = this;
        BooksAPI.getAll().then(
            function(books){
                console.log(books);
                context.setState({
                    currentlyReading: books.filter((book) => book.shelf === "currentlyReading"),
                    wantToRead: books.filter((book) => book.shelf === "wantToRead"),
                    read: books.filter((book) => book.shelf === "read")
                });
            });
    }

    componentDidMount() {
        this.getAllBooks();
    }

    render() {
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
                                    { this.state.currentlyReading.map(
                                        (book) => <Book key={book.id} book={book}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { this.state.wantToRead.map(
                                        (book) => <Book key={book.id} book={book}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { this.state.read.map(
                                        (book) => <Book key={book.id} book={book}/>)
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search"> Add a book </Link>
                </div>
            </div>
        )
    }
}

export default Home;