/**
 * @fileOverview 影院列表
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {connect} from 'react-redux';
import {getCinemaList} from '../../actions';

import CinemaListItem from '../../components/CinemaListItem';

import './index.css';

class index extends React.Component {

    constructor(props){
        super();
    }

    componentWillMount(){
        const {dispatch}=this.props;
        dispatch(getCinemaList());
    }

    // 切换影院
    switchCinema(pinyin){
        const {dispatch, cinema}=this.props;
        const len=cinema.cinemaList[pinyin].length;
        dispatch({
            type: !len ? 'SWITCH_CINEMA' : 'SWITCH_CINEMA_REMOVE',
            pinyin
        });
    }

    render(){
        const {cinemaList, areaList}=this.props.cinema;
        return (
            <div>
                <ul className="area-list">
                    {
                        areaList.map((area, index) => (
                            <li key={index} onClick={() => { this.switchCinema(area.pinyin)}}>
                                <span className="area-name">{area.name}</span>
                                <div className="cinema-list">
                                    {(cinemaList[area.pinyin] || []).map(item => {
                                        return <CinemaListItem key={item.id} cinema={item} />;
                                    })}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )

    }

}

const mapStateToProps=(state) => {

    return {
        cinema: state.cinema
    }

}

export default connect(mapStateToProps)(index);
