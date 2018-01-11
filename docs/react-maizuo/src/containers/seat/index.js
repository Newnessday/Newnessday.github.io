/**
 * @fileOverview 选座
 * @time 2018/1/9
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';

import './index.css';

class seat extends React.Component {

    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <div className="seat-cinema">
                    <div>
                        <h1>影城名称</h1>
                        <span>2018-01-09 17:57:19</span>
                    </div>
                    <div>
                        <a>换一场</a>
                    </div>
                </div>
                <div className="seat-list">
                    <div className="seat-hall">1号厅银幕方向</div>
                    <div>
                        <div className="seat-line">
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </div>
                        <div>
                            <ul>
                                <li></li>
                            </ul>
                            <ul>
                                <li></li>
                            </ul>
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="seat-checked">
                    <div className="seat-checked-num">
                        <span>1排1座</span>
                        <span>1排1座</span>
                        <span>1排1座</span>
                    </div>
                    <div className="seat-price">
                        <span>￥45</span>&nbsp;(45*2)
                        <a>确认</a>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps= state => {
    return {}
}

export default connect(mapStateToProps)(seat);
