const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
const User  = model.getModel('user')

Router.get('/list',(req,res)=>{
    User.find({},(err,doc)=>{
        return res.json(doc)
    })
})
Router.post('/register',function(req,res){
    console.log(req.body)
    const {user,pwd,type} = req.body
    User.find({user:user},(err,doc)=>{
        console.log('doc',doc)
        if(doc.length >0){
            return res.json({code:1,msg:'用户名重复'})
        }
        else{
            User.create({user,pwd:md5pwd(pwd),type},(e,d)=>{
                if(e){
                    return res.json({code:1,msg:'后端出错了'})
                }
                else{
                    return res.json({code:0})
                }
            })
        }
    })
})
function md5pwd(pwd){
    const halt = 'sajgdjasgdasasA123sa78';
    return utility.md5(utility.md5(pwd+halt))
}
Router.get('/info',(req,res)=>{
    //用户有没有cookie
    return res.json({code:1})
})


module.exports = Router