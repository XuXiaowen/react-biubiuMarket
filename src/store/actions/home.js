import * as types from '../action-types';
import {fetchSliders,fetchBrands,fetchMenuInfos,fetchBlockInfos} from '../../api/home';
export default {
    //获取轮播图
    getSliders(){
        return dispatch=>{
            fetchSliders().then(sliders=>{
                dispatch({
                    type:types.FETCH_SLIDERS,
                    payload:{sliders}
                });
            });
        }
    },
    //获取brands图
    getBrands(){
        return dispatch=>{
            fetchBrands().then(brands=>{
                dispatch({
                    type:types.FETCH_BRANDS,
                    payload:{brands}
                });
            });
        }
    },
    //获取menuInfos数据
    getMenuInfos(){
        return dispatch=>{
            fetchMenuInfos().then(menuInfos=>{
                dispatch({
                    type:types.FETCH_MENUINFOS,
                    payload:{menuInfos}
                });
            });
        }
    },
    //获取blockInfos数据
    getBlockInfos(){
        return dispatch=>{
            fetchBlockInfos().then(blockInfos=>{
              dispatch({
                    type:types.FETCH_BLOCKINFOS,
                    payload:{blockInfos}
                });
            });
        }
    }

}