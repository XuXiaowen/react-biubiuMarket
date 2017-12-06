import * as types from  '../action-types';
import {fetchUserInformation} from '../../api/userInformation';
export default {
    // 获取用户信息 当前不传参数只求获取所有数据
    getUserInformation(){
        return dispatch=>{
            fetchUserInformation().then(userInformation=>{
                dispatch({
                    type:types.FETCH_USERINFOMATION,
                    payload:{userInformation}
                })
            })
        }
    }
}