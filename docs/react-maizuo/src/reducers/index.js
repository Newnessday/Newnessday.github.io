/**
 * @fileOverview 首页
 * @time 2017/12/4
 * @author liugang
 * */

import {combineReducers} from 'redux';

import index from './index/index';
import movie from './movie';
import cinema from './cinema';

export default combineReducers({
    index,
    movie,
    cinema
});


