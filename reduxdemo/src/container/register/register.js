import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import './index.css'

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:"",
            repeatpwd:"",
            type:'genius'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    onhandleChange(key,value){
        this.setState({
            [key]:value
        })
    }
    handleRegister(){
        this.props.register(this.state)
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.onhandleChange('user',v)}>
                            用户名
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.onhandleChange('pwd',v)}>
                            密码
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.onhandleChange('repeatpwd',v)}>
                            确认密码
                        </InputItem>
                        <RadioItem checked={this.state.type==='genius'} onChange={()=>this.onhandleChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type==='boss'} onChange={()=>this.onhandleChange('type','boss')}>
                                boss
                        </RadioItem>
                        <Button type="primary" onClick={this.register} type="primary" onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}
export  default Register