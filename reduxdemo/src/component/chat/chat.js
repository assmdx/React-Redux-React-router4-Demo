import React from  'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'

import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from "../../redux/chat.redux";
import io from 'socket.io-client'
import {getChatId} from "../../redux/utils";
const socket = io("ws://localhost:9093");
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {text:'',msg:[]}
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if(this.props.chat.chatmsg.length === 0){
            console.log(this.props.chat)
            console.log('chat发消息了')
            this.props.getMsgList()
            //this.props.recvMsg()
        }
    }
    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})
    }
    render(){
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users

        if(!users[userid]){
            return null
        }

        const chatmsgs = this.props.chat.chatmsg.filter(v=> (
                v.chatid === (getChatId(userid,this.props.user._id))
            )
        )

        return(
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                    mode='dark'
                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(v=>{
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        return v.from === userid ? (
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ) :(
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar}/>}
                                    className='chat-me'
                                >{v.content}</Item>
                            </List>
                        )
                    })
                }
                <div className="stcick-footer">
                    <List>
                        <InputItem
                            placeholder ='请输入'
                            value={this.state.text}
                            onChange={v=>{this.setState({text:v})}}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        />
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat