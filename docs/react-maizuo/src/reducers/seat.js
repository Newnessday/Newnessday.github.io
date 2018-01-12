/**
 * @fileOverview
 * @time 2018/1/9
 * @author liugang
 * */

import {
    GET_SEAT_LIST
} from '../actions';

const initialState={};

export default (state=initialState, action) => {

    switch(action.type){
        case GET_SEAT_LIST :
            return {
                a: action.data
            }
            break;
        default :
            return state;
            break;
    }

}
