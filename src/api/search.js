import {get} from './index';
//获取search的数据
export function fetchSearchInfos(key) {
  return get('/search?str='+key);
}