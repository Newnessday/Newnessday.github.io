/**
 * @fileOverview 我的
 * @time 2018/1/4
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';

import {
    STORAEG_USER_INFO
} from '../../actions';

import './index.css';

class User extends React.Component {

    constructor(){
        super();
        this.state={
            sendCodeStatus: false,
            loginStatus: false
        }
        this.sendMobile=this.sendMobile.bind(this);
    }

    sendMobile(){
        var refs=this.refs;
        var mobile=refs.mobile.value;
        var sendCode=refs.sendCode;
        if(!mobile){
            alert('请输入手机号');
            return false;
        }
        sendCode.innerHTML='发送中...';
        fetch(`/api/user/sendCode/${mobile}`)
            .then(data => data.json())
            .then(json => {
                sendCode.innerHTML='发送验证码';
                if(!json.status){
                    alert('验证码发送成功');
                }else{
                    alert(json.msg);
                }
            });
    }

    submit(e){
        var {mobile, pwd}=this.refs;
        var mobileValue=mobile.value;
        var pwdValue=pwd.value;
        if(!mobileValue){
            alert('请输入手机号');
            return false;
        }else if(!pwdValue){
            alert('请输入手机验证码');
            return false;
        }

        this.setState({
            loginStatus: true
        });

        fetch(`/api/user/validateLogin?mobile=${mobileValue}&pwd=${pwdValue}`)
            .then(data => data.json())
            .then(json => {
                this.setState({
                    loginStatus: false
                });

                if(json.status!=0){
                    alert(json.msg);
                }else{
                    alert(`登录成功，欢迎：${json.data.data.name}`);
                    this.props.storageUserInfo(json.data);
                }
            })

    }

    render(){

        const {loginStatus}=this.state;

        return (
            <div className="user">
                <form style={{
                    lineHeight: '50px'
                }} onSubmit={(e) => {
                    e.preventDefault();
                    return false;
                }}>
                    <input onChange={() => {
                        this.setState({
                            sendCodeStatus: this.refs.mobile.value.length==11
                        })
                    }} maxLength='11' ref="mobile" type="text" name="mobile" placeholder="请输入手机号" />
                    <button style={{
                        display: this.state.sendCodeStatus ? 'block' : 'none'
                    }} ref="sendCode" onClick={this.sendMobile}>发送验证码</button><br/>
                    <input ref="pwd" type="password" placeholder="请输入手机验证码" /><br/>
                    <a className="submit" onClick={() => {this.submit()}}>登录{loginStatus ? '中...' : ''}</a>
                </form>
            </div>
        )
    }

}

const mapStateToProps=() => {
    return {};
}

const mapDispatchToProps= dispatch => {

    return {
        storageUserInfo: data => {
            dispatch({
                type: STORAEG_USER_INFO,
                data
            })
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(User);
