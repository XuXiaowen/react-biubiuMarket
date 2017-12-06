import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducers';
import createHistory from 'history/createHashHistory';
const history = createHistory();//用来管理路由历史的
import {routerMiddleware} from 'react-router-redux';

let router = routerMiddleware(history);
let store = createStore(reducer, applyMiddleware(thunk, promise, router, logger));
export default store;