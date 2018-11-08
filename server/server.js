const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

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
})