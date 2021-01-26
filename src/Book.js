import React from 'react';

import PropTypes from 'prop-types';
import {SHELVES} from "./constants";


const Book = props => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${props.book.imageLinks && props.book.imageLinks.smallThumbnail}")`
                }} />

                <div className="book-shelf-changer">
                    <select value={props.book.shelf || 'none'}
                            onChange={(e) => props.onShelfChange(props.book, e.target.value)}>

                        <option value="move" disabled> Move to... </option>
                        { SHELVES.map(opt => <option key={opt.id} value={opt.id}> {opt.title} </option>) }
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors && props.book.authors.join(', ')}</div>
        </div>
    </li>
  );

Book.propTypes = {
  book: PropTypes.shape({
        title: PropTypes.string,
        shelf: PropTypes.string,
        imageLinks: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        authors: PropTypes.arrayOf(PropTypes.string)
    }),
};

export default Book;
