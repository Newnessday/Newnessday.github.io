/**
 * @fileOverview
 * @time 2017/12/5
 * @author liugang
 * */

import {GET_MOVIE_LIST, GET_MOVIE_DETAIL} from '../../actions';

const initialState={
    type: 'playing',
    page: 1,
    list: [],
    detail: {}
}

export default (state=initialState, action) => {

    switch(action.type){
        case GET_MOVIE_LIST :
            return {
                list: action.list,
                detail: state.detail
            }
            break;
        case GET_MOVIE_DETAIL :
            return {
                detail: action.detail,
                list: state.list
            }
            break;
        default :
            return state;
            break;

    }

}
