import React from 'react'
import {connect} from 'react-redux'
@connect(
    state=>state
)
class Msg extends React.Component {
    render(){
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] =msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        return (<h1>消息列表</h1>)
    }
}
export default Msg