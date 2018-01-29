/**
 * @fileOverview 存储用户信息
 * @time 2018/1/29
 * @author liugang
 * */

import {
    STORAEG_USER_INFO
} from '../actions';

const user=(state, action) => {

    if(action.type==STORAEG_USER_INFO){
        return {
            userInfo: action.data.data
        }
    }else{
        return {};
    }

}

export default user;
