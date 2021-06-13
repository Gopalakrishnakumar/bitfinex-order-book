import React from 'react';
import * as ReactDOM from 'react-dom';
import HomeComponent from './components/home/home.component';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import socketRegister from './websocketMiddleware';
import $ from 'jquery'; 
import "./app.scss";

const store = createStore(reducer, applyMiddleware(thunk));
socketRegister(store);
ReactDOM.render(<Provider store={store}>
    <HomeComponent />
</Provider>, document.getElementById('app'));