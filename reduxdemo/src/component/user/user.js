import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace} from 'antd-mobile'
@connect(
    state=>state.user
)
class User extends  React.Component{
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
                    <Item>
                        退出登录
                    </Item>
                </List>
                <p>用户中心</p>
            </div>
        )
    }
}
export default User