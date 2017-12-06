import {combineReducers} from 'redux';
import home from './home';

import cart from './cart';

import signInfo from './signIn'
import userInformation from './userInformation';
import {routerReducer} from 'react-router-redux';
import market from './market';
import adress from './adress';
import region from './city';
export default combineReducers({
    home,
    cart,
    signInfo,
    market,
    region,
    userInformation
})