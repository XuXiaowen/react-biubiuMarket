import {post} from "./index";

//向后台发送请求用户的详细信息
export  function fetchUserInformation() {
    return post('/api/userInformation'); 
}