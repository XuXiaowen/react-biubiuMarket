import {get,post} from './index';
export function fetchCartCoods(tel) {
    //console.log(tel);
    return get(`/api/cartlist?tel=${tel}`);
}
export function addCartCoods(data) {
    return post('/api/cartlist',data);
}
export function addStoreCart(data) {
    return post('/api/carts',data);
}