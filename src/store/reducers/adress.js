/*
import * as types from '../action-types';

let AdressPerson=localStorage.getItem('AdressPerson');
let defaultState={
    phone:null,
    addressList:[]
};
AdressPerson=AdressPerson?JSON.parse(AdressPerson):defaultState
let reducer=(state=AdressPerson,action)=>{
    switch (action.type){
        case types.FETCH_GETADRESS:
            let nowAdress={...state,...action.payload};
            localStorage.setItem('AdressPerson',JSON.stringify(nowAdress));
            return nowAdress;
        default:
            localStorage.setItem('AdressPerson',JSON.stringify(state));
            return state
    }
};


export default reducer
*/
