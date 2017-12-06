
import * as types from '../action-types';
import {fetchCartCoods,addCartCoods} from '../../api/cart';

export default {
    //获取购物车
    getCartGoods(tel,fn){
        return dispatch=>{
            fetchCartCoods(tel).then(goods=>{
               // console.log(111,goods.data);
                dispatch({
                    type:types.FETCH_CARTGOODS,
                    payload:goods.data
                });
                fn()
            });
        }
    },
    addCart(data){
        return dispatch=>{
            addCartCoods(data).then(goods=>{
                dispatch({
                    type:types.FETCH_ADDGOODS,
                    payload:goods
                });
            });
        }
    },

    check(id,checked){
        return dispatch=>{
                dispatch({
                    type:types.FETCH_CHECK,
                    payload:{
                        id:id,
                        checked:checked
                    }
                });

        }
    },
    addCount(id,tel){
            return dispatch=>{
            dispatch({
                type:types.FETCH_ADD,
                payload:{
                    id:id,
                    tel:tel
                }
            });

        }
    }
    ,
    reduceList(id,tel){
        return dispatch=>{
            dispatch({
                type:types.FETCH_REDUCE,
                payload:{
                    id:id,
                }
            });

        }

    },
    addNumber(data){
        return dispatch=>{
            dispatch({
                type:types.FETCH_REDUCE,
                payload:data
            });
        }
    },
    lessCarts(data){
        return dispatch=>{
            dispatch({
                type:types.FETCH_LESS,
                payload:data
            });
        }
    }

}
