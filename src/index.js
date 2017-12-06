import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from "./container/App/index";
import store from './store';
import {Provider} from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.querySelector('#root'));


