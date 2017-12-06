import * as types from '../action-types';
let initState={
    userId:"",
    username:"",
    phone:"",
    addressList:[],
    nickName:'小蜜蜂',
    sex:"男",
    age:"0",
    photoUrl:"http://ww1.sinaimg.cn/large/c3fd4c29ly1fltkccp63fj20oo0ootau.jpg"
};
export  default function (state=initState,action) {
    switch (action.type){
        case types.FETCH_USERINFOMATION:
        return{
            ...state,
            userInformation:action.payload.userInformation
        };
        default:
            return state;
    }
}