import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import {getMsgList} from "../../redux/chat.redux";

@connect(
    state=>state,
    {getMsgList}
)
class Msg extends React.Component {
    getLast(arr){
        return arr[arr.length - 1 ]
    }
    componentDidMount(){
        if(this.props.chat.chatmsg.length === 0){
            this.props.getMsgList()
        }
    }
    render(){
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        const msgGroup = {}

        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] =msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup)
        const Item = List.Item
        const Brief = Item.Brief
        return (
            <div>
                {
                    chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from === userid ? v[0].to :v[0].from
                        const name = userinfo[targetId] ? userinfo[targetId].name : ""
                        const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ""
                        const unreadNumn = v.filter(vv=> !vv.read && vv.to === userid).length
                        return (
                            <List
                                key={lastItem._id}
                            >
                                <Item
                                    thumb={require(`../img/${avatar}.png`)}
                                    extra={<Badge text={unreadNumn}></Badge>}
                                >
                                    {lastItem.content}
                                    <Brief>{name}</Brief>
                                </Item>
                            </List>
                        )}
                    )
                }
            </div>
        )
    }
}
export default Msg