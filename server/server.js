const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const User  = model.getModel('user')
const Chat  = model.getModel('chat')

const userRouter = require('./user')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)

server.listen(9093,()=>{
    console.log('Node app start at 9093')
})


io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',(data)=>{
        // console.log(data)
        // io.emit('recvmsg',data)
        const {from,to,msg} = data
        console.log(from)
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})
