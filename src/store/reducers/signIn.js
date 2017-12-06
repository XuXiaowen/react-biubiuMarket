import * as types from '../action-types';
let userInfo
if(localStorage.getItem('userInfo')) {
 userInfo = JSON.parse(localStorage.getItem('userInfo'));
}


let defaultState = userInfo || {user: null, code: 1};
let reducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_SIGNIN:
            let defaultUserInfo = {...state, ...action.payload};
            localStorage.setItem('userInfo', JSON.stringify(defaultUserInfo));
            return defaultUserInfo;
        case types.FETCH_ADDADRESS:
            state.user=action.payload;
            let addUserInfo=state;
            localStorage.setItem('userInfo', JSON.stringify(addUserInfo));
            return addUserInfo;
        case types.FETCH_DELEDRESS:
            state.user=action.payload;
            let delUserInfo=state;
            localStorage.setItem('userInfo', JSON.stringify(delUserInfo));
            return delUserInfo;
        case types.FETCH_MODIFIDRESS:
            state.user=action.payload;
            localStorage.setItem('userInfo', JSON.stringify(state));
            return state;
        default:
            return state;
    }
};
export default reducer
