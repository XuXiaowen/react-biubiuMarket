import {get} from './index';
//向后台请求轮播图的数据
export function fetchSliders() {
  return get('/sliders');
}
//向后台请求brands图的数据
export function fetchBrands() {
  return get('/brands');
}
//向后台请求menuInfos数据
export function fetchMenuInfos() {
  return get('/menuInfos');
}
//向后台请求blockInfos数据
export function fetchBlockInfos() {
  return get('/blockInfos');
}

