import * as types from '../action-types';

import {fetchCartCoods, addCartCoods} from '../../api/cart';

let initState = {
    cartList: [],
    tel: ''
}

export default function (state = initState, action) {
    console.log(1, action);
    switch (action.type) {
        case types.FETCH_CARTGOODS:
            return {
                ...state,
                cartList: action.payload.cartList,
                tel: action.payload.tel
            };

        case types.FETCH_ADDGOODS:
            return {
                ...state,
                cartList: action.payload.cartList,
                tel: action.payload.tel
            }

        case types.FETCH_CHECK:
            let st = {
                ...state,
                cartList: state.cartList.map((item) => {
                    // console.log(item.goodsid == action.payload.id);
                    if (item.goodsid == action.payload.id) {
                        item.isShow = !item.isShow;
                    }
                    return item
                })
            };
            // console.log(st);
            return st;

        case types.FETCH_ADD:

            let newCount = [
                ...state.cartList.map((item) => {
                    if (item.goodsid == action.payload.id) {
                        let a = item.total;
                        let b = item.count;
                        b++;
                        b > a ? b = a : null;
                        item.count = b;
                        // console.log('33', b);
                    }

                    return item
                })
            ]
            return {
                ...state,
                cartList: newCount,
                tel: action.payload.tel

            }
        case types.FETCH_REDUCE:
            let minusCount = [
                ...state.cartList.map((item) => {
                    if (item.goodsid == action.payload.id) {
                        let a = 0;
                        let b = item.count;
                        b--;
                        b < a ? b = a : null;
                        item.count = b;
                        console.log('44', b);
                    }

                    //console.log("aaa",item);
                    // addCartCoods(item)
                    return item
                })
            ]
            return {
                ...state,
                cartList: minusCount,
                tel: action.payload.tel
            }
        case types.FETCH_LESS:
            console.log(6,action.payload,'555555555555555');
            return {
                ...state,
                cartList: action.payload
            }
        default:
            return state;
    }
}