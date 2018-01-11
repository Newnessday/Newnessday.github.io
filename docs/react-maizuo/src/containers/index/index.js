/**
 * @fileOverview 首页
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {connect} from 'react-redux';
import {
    Link
} from 'react-router-dom';

import './index.css';

import {homePlaying, homeComing} from '../../actions';

import HomeMovieListItem from '../../components/HomeMovieListItem';

class index extends React.Component {

    constructor(){
        super();
    }

    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(homePlaying);
        dispatch(homeComing);
    }

    render(){
        const {playing, coming}=this.props.index;
        console.log(this.props)
        return (
            <div className="show-list">
                <p className="show-list-title">
                    <span>正在热映</span>
                </p>
                <ul className="hot-show">
                    {
                        playing.map( (item, index) => (
                            <HomeMovieListItem key={index}  data={item} />
                        ))
                    }
                </ul>
                <Link to="/movie/list/playing" className="more">更多热映电影</Link>
                <p className="show-list-title">
                    <span>即将上映</span>
                </p>
                <ul className="hot-show">
                    {
                        coming.map((item, index) => (
                            <HomeMovieListItem data={item} key={index}/>
                        ))
                    }
                </ul>
                <Link className="more" to="/movie/list/coming">更多即将上映电影</Link>
            </div>
        )

    }

}

const mapStateToProps=state => {
    return {
        index: state.index
    }
}

export default connect(mapStateToProps)(index);
