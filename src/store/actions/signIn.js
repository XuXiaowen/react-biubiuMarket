import * as types from '../action-types';
import {fetchSignIn} from '../../api/signIn';
import {push} from 'react-router-redux';
export default {
    signIn(user) {
        return dispatch=>{
            fetchSignIn(user).then((result)=>{
                dispatch({
                    type:types.FETCH_SIGNIN,
                    payload:result
                });
                let {code}=result;
                    if(code==0){
                        dispatch(push('/home'))
                    }
                   // localStorage.setItem('userInfo',JSON.stringify(result));



            }).catch((error)=>{
                console.log(error);
                debugger;
            })
        }
    }
}