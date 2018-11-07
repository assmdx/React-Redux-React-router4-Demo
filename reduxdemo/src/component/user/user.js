import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
@connect(
    state=>state.user
)
class User extends  React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('注销','确认退出登录吗？',[
            {text:'取消',onPress:()=>console.log('cancel')},
            {text:'确定',onPress:()=>{
                    browserCookie.erase('userid')
                    window.location.href = window.location.href
                }
            },
        ])
    }
    render(){
        console.log(this.props)
        const props = this.props
        if(!props.user){
            return null
        }

        const Item = List.Item
        const Brief = Item.Brief
        return (
            <div>
                <Result
                    img={<img style={{width:50}} src={require(`../img/${props.avatar}.png`)}/>}
                    title={props.user}
                    message={props.type === 'boss' ? props.company :null}
                />

                <List renderHeader={()=>'简介'}>
                    <Item>
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick={this.logout}>
                        退出登录
                    </List.Item>
                </List>
            </div>
        )
    }
}
export default User