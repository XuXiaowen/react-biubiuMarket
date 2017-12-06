import * as types from '../action-types';

let regionState={
    city:'',
    region: []
};
let reducer=(state=regionState,action)=>{
    switch (action.type){
        case types.FETCH_GETREGION:
            return action.payload;
        default:

            return state;
            console.log(state);
    }
};
export default reducer