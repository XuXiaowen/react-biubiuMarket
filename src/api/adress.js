import {get,post,put} from './index';
//后台请求地址
export function fetchGetAdress(tel){
    return get(`/api/adress?tel=${tel}`)
}
//后台请求城市详情地区
export function fetchGetRegion(city){
    return get(`/api/city?city=${city}`)
}
//向后台添加收货地址
export function fetchAddAdress(receiver){
    return post('/api/adress',receiver)
}
// 删除收货地址
export function fechDelAdress(id){
    return post('/api/delAdress',id)
}
//修改收货地址
export function fetchModifiAdress(receiver){
    return post('/api/modifiAdress',receiver)
}