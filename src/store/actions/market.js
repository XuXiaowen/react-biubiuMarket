/**
 * Created by Lily on 2017/11/21.
 */
import * as types from '../action-types'
import {fetchMarket, fetchGoods} from '../../api/market'
export default {
    getMarket(typeid){
        console.log(typeid);
        return (dispatch) => {
            fetchMarket(typeid).then((res) => {
                console.log(res);
                dispatch({
                        type: types.FETCH_MARKET,
                        payload: res
                    })
                }
            ).catch(err => {
                dispatch({
                    type: types.ERR_MARKET,
                    payload: {code: 1}
                });
            });
        }
    },
    getGoods(subtypename){
        return (dispatch) => {
            fetchGoods(subtypename).then((res) => {
                    dispatch({
                        type: types.FETCH_MARKET,
                        payload: res
                    })
                    console.log('&&&&&&&&&&&&&&&&&&&');
                    console.log(res);
                }
            ).catch(err => {
                dispatch({
                    type: types.ERR_MARKET,
                    payload: {code: 1}
                });
            });
        }
    }
}
