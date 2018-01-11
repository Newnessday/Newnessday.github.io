/**
 * @fileOverview 我的
 * @time 2018/1/4
 * @author liugang
 * */

import React from 'react';
import {connect} from 'react-redux';

class User extends React.Component {

    constructor(){
        super();
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
        }else if(!pwdValue){
            alert('请输入手机验证码');
        }
        fetch(`/api/user/validateLogin?mobile=${mobileValue}&pwd=${pwdValue}`)
            .then(data => data.json())
            .then(json => {

            })
        // fetch(new Request('/api/user/validateLogin', {
        //     body: JSON.stringify({
        //         a: 123
        //     })
        // }))

    }

    render(){
        return (
            <form style={{
                lineHeight: '50px'
            }} onSubmit={(e) => {
                e.preventDefault();
                return false;
            }}>
                <input maxLength='11' ref="mobile" type="text" name="mobile" placeholder="请输入手机号" />
                <button ref="sendCode" onClick={this.sendMobile}>发送验证码</button><br/>
                <input ref="pwd" type="password" placeholder="请输入手机验证码" /><br/>
                <input type="button" onClick={() => {this.submit()}} value="登录" />
            </form>
        )
    }

}

export default User;
