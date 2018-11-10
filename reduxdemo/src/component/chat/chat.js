import React from  'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'

import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from "../../redux/chat.redux";
import io from 'socket.io-client'
import {getChatId,getEmojiUrl} from "../../redux/utils";
import qqWechatEmotionParser from 'qq-wechat-emotion-parser';

const socket = io("ws://localhost:9093");
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {text:'',msg:[],shwoEmoji:false}
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if(this.props.chat.chatmsg.length === 0){
            this.props.getMsgList()
            //this.props.recvMsg()

        }
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        })
    }
    handleSubmit(){
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showEmoji:false})
    }
    render(){
        const emoji = "/::) /::~ /::B /::| /:8-) /::< /::$ /::X /::Z /::'( /::-| /::@ /::P /::D /::O /::( /::+ /:--b /::Q /::T /:,@P /:,@-D /::d /:,@o /::g /:|-) /::! /::L /::> /::,@"
            .split(' ')
            .filter(v=>v)
            .map(v=>({icon:getEmojiUrl(qqWechatEmotionParser(v))}))

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
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:12}}
                                        onClick={()=>{
                                                        this.setState({showEmoji:true})
                                                        this.fixCarousel()
                                                    }
                                                }
                                    ><img src={getEmojiUrl(qqWechatEmotionParser("/::)"))}/></span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        />
                        {
                            this.state.showEmoji
                                ?<Grid
                                    data={emoji}
                                    columnNum = {9}
                                    carouselMaxRow={3}
                                    isCarousel={true}
                                    onClick={el=>{
                                        this.setState({
                                            text:this.state.text + el.icon
                                        })
                                    }}
                                />
                                :null
                        }
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat