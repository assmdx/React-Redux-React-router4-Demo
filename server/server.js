const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)

app.listen(9093,()=>{
    console.log('Node app start at 9093')
})
