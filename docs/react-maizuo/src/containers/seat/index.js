/**
 * @fileOverview 选座
 * @time 2018/1/9
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';


import {getSeat} from '../../actions';

import './index.css';

class seat extends React.Component {

    constructor(){
        super();
        this.state={
            checkedSeat: {},
            seatPrice: 0
        }
    }

    componentDidMount(){
        const {dispatch}=this.props;
        dispatch(getSeat(this.props.match.params.playId))
    }

    handelSeat(seatInfo){
        let state=this.state;
        let seatKey=`${seatInfo.row}-${seatInfo.column}`;
        //
        // this.setState({
        //     seatPrice: this.state.seatPrice+1
        // })
        // this.setState({
        //     seatPrice: this.state.seatPrice+1
        // })

        this.setState((state, props) => {
            return {
                seatPrice: state.seatPrice+1
            }
        })

        // this.setState(Object.assign({}, this.state, {
        //     checkedSeat: {
        //         [seatKey]: seatInfo
        //     }
        // }), () => alert(1221))
    }

    componentDidUpdate(){
        console.log(this)
    }

    render(){
        const {seat, seatRow}=this.props;
        const {checkedSeat, seatPrice}=this.state;
        if(!seat){
            return (<div>座位加载中...</div>);
        }

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
                            {
                                seatRow.map((row, index) => <span key={index}>{row}</span>)
                            }
                        </div>
                        <div>
                            {
                                seat.seats.map(seatRow => (
                                    <ul>
                                        {
                                            seatRow.map(seatColumn => (
                                                <li className={
                                                    checkedSeat[`${seatColumn.row}-${seatColumn.column}`] ? 'active' : ''
                                                } onClick={() => {
                                                    this.handelSeat(seatColumn);
                                                }} key={`${seatColumn.row}-${seatColumn.column}`}></li>
                                            ))
                                        }
                                    </ul>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="seat-checked" style={{display: Object.keys(checkedSeat).length ? 'block' : 'none'}}>
                    <div className="seat-checked-num">
                        {
                            Object.values(checkedSeat).map(item => (<span>{item.row}排{item.column}座</span>))
                        }
                    </div>
                    <div className="seat-price">
                        <span>￥{seatPrice*Object.keys(checkedSeat).length}</span>&nbsp;({seatPrice}*{Object.keys(checkedSeat).length})
                        <a>确认</a>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps= state => {

    return {
        seat: state.seat.data,
        seatRow: state.seat.seatRow
    }
}

export default connect(mapStateToProps)(seat);
