/**
 * @fileOverview
 * @time 2017/12/4
 * @author liugang
 * */

import * as HOME_ACTION from '../../actions';

var initialState={
    coming: [],
    playing: [],
    slider: []
}

export default (state=initialState, action) => {

    switch(action.type){
        case HOME_ACTION.GET_HOME_PLAYING :
            return {
                playing: action.playing,
                coming: state.coming
            }
            break;
        case HOME_ACTION.GET_HOME_COMING :
            return {
                coming: action.coming,
                playing: state.playing
            }
            break;
        default :
            return state;
    }
}
