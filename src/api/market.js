/**
 * Created by Lily on 2017/11/21.
 */
import {get} from './index'
const HOST = 'http://localhost:3000';
export function fetchMarket(typeid) {
    return get(`/market?typeid=${typeid}`);
}
export function fetchGoods(subtypename) {
    return get(`/market?subtypename=${subtypename}`);
}