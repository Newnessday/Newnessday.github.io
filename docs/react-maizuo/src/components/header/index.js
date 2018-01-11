/**
 * @fileOverview 顶部导航
 * @time 2017/12/3
 * @author liugang
 * */

import React from 'React';
import {
    Link
} from 'react-router-dom';

import './index.css'

class Header extends React.Component {

    constructor(){
        super();
    }

    back(){
        const backUrl=localStorage.backUrl;
        backUrl ? location.href=backUrl : history.go(-1);
    }

    render(){

        return (
            <header>
                <div>
                    <Link to="/">首页</Link>
                    <Link to="/movie/list/playing">影片</Link>
                    <Link to="/cinema">影院</Link>
                    <Link to="/user">我的</Link>
                    <a style={{
                        float: 'right'
                    }} onClick={this.back}>返回上一页</a>
                </div>
            </header>
        )

    }

}

export default Header;


