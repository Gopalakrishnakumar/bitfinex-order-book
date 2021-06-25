import React from 'react';
import * as ReactDOM from 'react-dom';
import HomeComponent from './components/home/home.component';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import $ from 'jquery';
import cacheLoader from './cacheLoaderMiddleware';
import "./app.scss";

const store = createStore(reducer, applyMiddleware(thunk, cacheLoader('orderBook')));

ReactDOM.render(<Provider store={store}>
    <HomeComponent />
</Provider>, document.getElementById('app'));