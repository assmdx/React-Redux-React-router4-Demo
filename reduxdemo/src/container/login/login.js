import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        //这么写每次传入的都是定义好 的register函数
    }
    register(){
        this.props.history.push('/register')
        //所有的路由组件，即为和路由直接绑定的组件
        //都可以使用history*/
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export  default Login