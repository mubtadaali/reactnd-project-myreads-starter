import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import './App.css';
import Home from './Home';
import Search from './Search';

const BooksApp = () => (
    <div className="app">
        <BrowserRouter>
            <Route path="/search" component={ Search } />
            <Route path="/" exact component={ Home } />
        </BrowserRouter>
    </div>
);

export default BooksApp
