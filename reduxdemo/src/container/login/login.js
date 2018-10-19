import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {login} from "../../redux/user.redux";
import "./index.css"

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
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.onhandleChange('user',v)}>
                            用户名
                        </InputItem>
                        <InputItem onChange={v=>this.onhandleChange('pwd',v)}>
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