import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from "../../redux/user.redux";
import "./index.css"

function WrapprHello(Comp){
    class WrapComp extends React.Component {
        render(){
            return (
                <div>
                    <p>这是HOC高阶组件</p>
                    <Comp {...this.props}></Comp>
                </div>
            )
        }
    }
    return WrapComp
}
@WrapprHello
class Hello extends React.Component{
    render(){
        return <h2>hello assmdx</h2>
    }
}

//Hello = WrapprHello(Hello)
@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuth:false,
            user:'',
            pwd:""
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        //这么写每次传入的都是定义好 的register函数
    }
    onhandleChange(key,value){
        this.setState({
            [key]:value
        })
    }
    register(){
        this.props.history.push('/register')
        //所有的路由组件，即为和路由直接绑定的组件
        //都可以使用history*/
    }
    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                {/*<Hello></Hello>*/}
                {this.props.redirectTo && this.props.redirectTo!='/login' ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.onhandleChange('user',v)}>
                            用户名
                        </InputItem>
                        <InputItem
                            onChange={v=>this.onhandleChange('pwd',v)}
                            type="password"
                        >
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export  default Login