/**
 * @fileOverview 影片列表
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {connect} from 'react-redux';
import {
    Link
} from 'react-router-dom';

import './index.css';

import {movieList} from '../../actions';

class index extends React.Component {

    constructor(){
        super();
    }

    componentWillMount(){
        const props=this.props;
        const {type}=props.match.params;
        props.dispatch(movieList());
    }

    render(){
        const {list}=this.props.movie;
        return (
            <div className="movie-list">
                <div className="movie-tab">
                    <span className="active">正在热映</span>
                    <span>即将上映</span>
                </div>
                <ul className="">
                    {
                        list.map(item => (
                            <li key={item.id}>
                                <Link to={`/movie/detail/${item.id}`} style={{
                                    display: 'block'
                                }}>
                                    <img src={item.cover.origin} />
                                    <h1>{item.name}</h1>
                                    <span>{item.intro}</span><br/>
                                    <em>{item.cinemaCount}</em>家影院上映&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <em>{item.watchCount}</em>人购票
                                    <i>2月28日上映</i>
                                </Link>
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
        movie: state.movie
    }

}

export default connect(mapStateToProps)(index);

