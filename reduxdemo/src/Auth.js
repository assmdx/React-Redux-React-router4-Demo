import React from 'react'
import {connect} from "react-redux";
import {login} from "./Auth.redux";
import {Redirect} from 'react-router-dom'

@connect(
    //你要state什么属性放到props里
    state=>state.auth,
    {login}
    //你要什么方法，放到props里,自动dispatch
)
class Auth extends React.Component {
    render(){
        const needLogin = <button onClick={this.props.login}>你需要登录</button>
        const hasLogin = <Redirect to='/dashboard'></Redirect>
        return this.props.isAuth ?  hasLogin : needLogin
        //return <h2>Auth</h2>
    }
}
export default Auth