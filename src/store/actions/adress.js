import * as types from '../action-types';
import {fetchGetRegion, fetchAddAdress, fechDelAdress, fetchModifiAdress} from '../../api/adress';
import {push} from 'react-router-redux';

export default {
    //获取城市区域列表
    getCityRegion(city) {
        return dispatch => {
            fetchGetRegion(city).then((result) => {
                dispatch({
                    type: types.FETCH_GETREGION,
                    payload: result
                });
            })
        }
    },
    //增加收货地址
    addReceiver(receiver) {
        return dispatch => {
            fetchAddAdress(receiver).then((result) => {
                dispatch({
                    type: types.FETCH_ADDADRESS,
                    payload: result
                });
                dispatch(push('/affirm'));
            })
        }
    },
    //删除收货地址
    delReceiver(id) {
        return dispatch => {
            fechDelAdress(id).then(result => {
                dispatch({
                    type: types.FETCH_DELEDRESS,
                    payload: result
                });
                dispatch(push('/affirm'));
            })
        }

    },
    //修改收货地址
    modifiReceiver(receiver) {
        return dispatch => {
            fetchModifiAdress(receiver).then(result => {
                dispatch({
                    type: types.FETCH_MODIFIDRESS,
                    payload: result
                });
                dispatch(push('/affirm'));
            })
        }
    }
}