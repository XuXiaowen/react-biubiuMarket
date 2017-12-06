import {get,post} from './index';
//向后台发送登录注册信息
export function fetchSignIn(user) {
    return post('/api/signIn',user);
}