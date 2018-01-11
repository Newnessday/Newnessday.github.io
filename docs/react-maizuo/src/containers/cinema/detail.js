/**
 * @fileOverview 影院详情
 * @time 2018/1/3
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getCinemaDetail} from '../../actions';

import './index.css';

class Detail extends React.Component {

    constructor(){
        super();
    }

    componentWillMount(){
        const {match, dispatch}=this.props;
        dispatch(getCinemaDetail(match.params.id));
    }

    render(){
        console.log(this)
        var service=[];
        const {detail}=this.props;
        if(!detail.name) return false;
        document.title=detail.name;
        detail.services.map(item => service.push(item.description));
        return (
            <div>
                <img src='https://static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png' />
                <h1>{detail.name}</h1>
                <ul>
                    <li>
                        地址：{detail.address}
                    </li>
                    <li>
                        电话：{detail.telephones}
                    </li>
                    <li>
                        服务：{service.join('；')}
                    </li>
                </ul>
                <Link to={`/cinema/film/${detail.id}`} style={{
                    color: 'red',
                    fontSize: '20px'
                }}>立即订座</Link>
            </div>
        )
    }

}

const mapStateToProps=state => {
    return {
        detail: state.cinema.detail || {}
    }
}

export default connect(mapStateToProps)(Detail);

