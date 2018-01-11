/**
 * @fileOverview 影片详情
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {movieDetail} from '../../actions';

class detail extends React.Component {

    constructor(){
        super();
    }

    componentWillMount(){
        const props=this.props;
        props.dispatch(movieDetail(props.match.params.id));
    }

    render(){
        const {detail}=this.props;
        const actors=[];
        if(!detail.synopsis) return false;

        (detail.actors || []).map(item => actors.push(item.name));

        return (
            <div>
                <img src={detail.cover.origin}/>
                <div className="movie-info">
                    <h1>影片简介</h1>
                    <ul>
                        <li>
                            <span>导演：</span>
                            <span>{detail.director}</span>
                        </li>
                        <li>
                            <span>主演：</span>
                            <span>{actors.join('、')}</span>
                        </li>
                        <li>
                            <span>地区语言：</span>
                            <span>{detail.nation}/{detail.language}</span>
                        </li>
                        <li>
                            <span>类型：</span>
                            <span>{detail.category}</span>
                        </li>
                        <li>
                            <span>上映日期：</span>
                            <span>{detail.premiereAt}</span>
                        </li>
                    </ul>
                    <p>{detail.synopsis}</p>
                    <Link to={{
                        pathname: '/cinema',
                        search: `?movieId=${detail.id}`
                    }}>立即购票</Link>
                </div>
            </div>
        )

    }

}

const mapStateToProps=state => {
    return {
        detail: state.movie.detail
    }
}

export default connect(mapStateToProps)(detail);

