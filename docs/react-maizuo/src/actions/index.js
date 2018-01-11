/**
 * @fileOverview
 * @time 2017/12/4
 * @author liugang
 * */

// 首页
export const GET_HOME_PLAYING='GET_HOME_PLAYING';   //获取首页正在上映列表
export const GET_HOME_COMING='GET_HOME_COMING';   //获取首页即将上映列表
export const homePlaying=dispatch => {

    fetch('/api/home/playing')
        .then(data =>  data.json())
        .then(json => {
            dispatch({
                type: GET_HOME_PLAYING,
                playing: json.data.films
            });
        })

}
export const homeComing=dispatch => {
    fetch('/api/home/coming')
        .then(data => data.json())
        .then(json => {
            dispatch({
                type: GET_HOME_COMING,
                coming: json.data.films
            })
        })
}

// 影片列表
export const GET_MOVIE_LIST='GET_PLAYING_LIST';   //获取影片列表
export const movieList=(type) => dispatch => {
    fetch('/api/home/playing')
        .then(data =>  data.json())
        .then(json => {
            dispatch({
                type: GET_MOVIE_LIST,
                list: json.data.films
            });
        })
}

// 影片详情
export const GET_MOVIE_DETAIL='GET_MOVIE_DETAIL';   //获取影片详情
export const movieDetail=id => dispatch => {
    fetch(`/api/movie/detail/${id}`)
        .then(data => data.json())
        .then(json => {
            dispatch({
                type: GET_MOVIE_DETAIL,
                detail: json.data.film
            });
        });
}

// 影院列表
export const GET_CINEMA_LIST='GET_CINEMA_LIST';     //影院列表
export const getCinemaList= () => dispatch => {

    fetch(`/api/cinema/list`)
        .then(data => data.json())
        .then(json => {
            dispatch({
                type: GET_CINEMA_LIST,
                cinemaList: json.data.cinemas
            })
        })

}

// 影院详情
export const GET_CINEMA_DETAIL='GET_CINEMA_DETAIL';
export const getCinemaDetail= id => dispatch => {
    fetch(`/api/cinema/detail/${id}`)
        .then(data => data.json())
        .then(json => {
            dispatch({
                type: GET_CINEMA_DETAIL,
                detail: json.data.cinema
            })
        })
}

// 影院场次上映列表
export const GET_CINEMA_FILM='GET_CINEMA_FILM';
export const getCinemaFilm= cinemaId => dispatch => {

    const filmList=(resolve) => {
        fetch(`/api/cinema/film/${cinemaId}`)
            .then(data => data.json())
            .then(json => {
                resolve(json.data.filmList);
            })
    }

    const playList=(filmList) => {
        return new Promise(resolve => {
            fetch(`/api/cinema/filmPlay/${cinemaId}`)
                .then(data => data.json())
                .then(json => {
                    resolve({
                        filmList,
                        playList: json.data.schedules
                    });
                })
        })
    }

    new Promise(filmList)
        .then(result => {
            return playList(result);
        })
        .then(result => {
            dispatch({
                type: GET_CINEMA_FILM,
                filmList: result.filmList,
                playList: result.playList
            });
        })

}
