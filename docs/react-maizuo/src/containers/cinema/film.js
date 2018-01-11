/**
 * @fileOverview 影院上映影片展示
 * @time 2018/1/5
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';
import {getCinemaFilm} from '../../actions';

import './index.css';

class film extends React.Component {

    constructor(){
        super();
        this.state={
            timeList: [],
            showMovieId: '',    //当前所显示的影片id
            showMovieDate: ''   //当前所显示的影片日期
        }
    }

    componentDidMount(){
        this.props.dispatch(getCinemaFilm(this.props.match.params.id));
    }

    // 切换影片
    switchMovie(showMovieId){
        this.setFilmState({
            showMovieId,
            showMovieDate: Object.keys(this.props.playList[showMovieId])[0]
        })
    }

    // 切换播放日期
    switchMovieDate(showMovieDate){
        this.setFilmState({
            showMovieDate
        })
    }

    setFilmState(stateObject){
        this.setState(Object.assign({}, this.state, stateObject));
    }

    render(){
        var {filmList, playList}=this.props;
        var state=this.state;

        if(!state.showMovieId && filmList.length){
            var showMovieId=filmList[0].filmID;
            var showMovieDate=Object.keys(playList[showMovieId])[0];
        }

        if(!filmList.length){
            return (<div></div>);
        }

        return (
            <div className="cinema-film">
                <div className="cinema-film-list">
                    <ul>
                        {
                            (filmList || []).map(item => {
                                var showFilmId=this.state.showMovieId || showMovieId;
                                return (
                                    <li className={item.filmID==showFilmId ? 'active' : ''} key={item.filmID} onClick={() => this.switchMovie(item.filmID)}>
                                        <img src={item.posterAddress} /><br/>
                                        <span>{item.filmName}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="cinema-film-time">
                    {
                        Object.keys(playList[state.showMovieId || showMovieId]).map((item, index) => {
                            let date=this.state.showMovieDate || showMovieDate;
                            return (
                                <a className={item==date ? 'active' : ''} key={index} onClick={() => {this.switchMovieDate(item)}}>{item}</a>
                            )
                        })
                    }
                </div>
                <ul className="cinema-film-play">
                    {
                        (playList[state.showMovieId || showMovieId])[state.showMovieDate || showMovieDate].map(item => {
                            var startDate = new Date(item.showAt);
                            var stopDate = new Date(item.stopSellingAt);
                            return (
                                <li key={item.id} onClick={() => {
                                    location.hash=`/seat/${item.id}`;
                                }}>
                                    <strong>{startDate.getHours()}:{startDate.getMinutes()}</strong><br/>
                                    预计{stopDate.getHours()}:{stopDate.getMinutes()}结束/{item.film.language}{item.imagery}/{item.hall.name}
                                    <span>￥{item.price.min+item.price.premium}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

}

const mapStateToProps= state => {
    var {playList, filmList}=state.cinema;
    return {
        filmList: filmList || [],
        playList
    }
}

export default connect(mapStateToProps)(film);
