import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';
import Home from './Home';
import Search from './Search';

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
        <BrowserRouter>
            <Route path="/search" component={ Search } />
            <Route path="/" exact component={ Home } />
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
