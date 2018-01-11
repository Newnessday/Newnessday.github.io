/**
 * @fileOverview
 * @time 2017/12/6
 * @author liugang
 * */

import {
    GET_CINEMA_LIST,
    GET_CINEMA_DETAIL,
    GET_CINEMA_FILM
} from '../actions';

const initialState={
    areaList: [],
    cinemaList: {},
    cinemaListJson: {},
    detail: {},
    filmList: [],
    playList: {}
}

const formatCinemaList=data => {
    var areaList=[];
    var cinemaList={};
    var cinemaListJson={};
    var defaultPinyin='';
    data.map(item => {
        var pinyin=item.district.pinyin;
        if(!cinemaList[pinyin]){
            cinemaList[pinyin]=[];
            // cinemaList.push(item.district);
            areaList.push(item.district)
        }
        if(!cinemaListJson[pinyin]){
            cinemaListJson[pinyin]=[];
        }
        cinemaListJson[pinyin].push(item);
        defaultPinyin= !defaultPinyin ? pinyin: defaultPinyin;
        if(pinyin==defaultPinyin){
            cinemaList[pinyin].push(item);
        }

    });
    return {
        cinemaList,
        areaList,
        cinemaListJson,
        detail: {}
    };
}

// 格式化影片数据
const formatFilmData= action => {
    var {filmList, playList}=action;
    var playJson={};
    playList.map(item => {
        var filmId=item.film.id;
        var date=new Date(item.showAt);
        var d=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        if(!playJson[filmId]){
            playJson[filmId]={
                // timeList: [],
                // playList: []
            }
        }

        if(!playJson[filmId][d]){
            playJson[filmId][d]=[];
        }

        playJson[filmId][d].push(item);

        // playJson[filmId].timeList.push(item.showAt);
        // playJson[filmId].playList.push(item);
    })
    return {
        playList: playJson,
        filmList
        // defaultShowFilmId: filmList[0].filmID
    };
}


export default (state=initialState, action) => {

    switch(action.type){
        case GET_CINEMA_LIST :
            return formatCinemaList(action.cinemaList)
            break;
        case 'SWITCH_CINEMA' :
            var d=state;
            d.cinemaList[action.pinyin]=state.cinemaListJson[action.pinyin];
            return Object.assign({}, d);
            break;
        case 'SWITCH_CINEMA_REMOVE' :
            var d=state;
            d.cinemaList[action.pinyin]=[];
            return Object.assign({}, d);
            break;
        case GET_CINEMA_DETAIL :
            return Object.assign({}, state, {
                detail: action.detail
            });
            break;
        case GET_CINEMA_FILM :
            console.log(formatFilmData(action));
            return Object.assign({}, state, formatFilmData(action));
            break;
        default :
            return state;
            break;
    }

}

