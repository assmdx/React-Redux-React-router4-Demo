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
    const {user,pwd,type} = req.body
    User.findOne({user:user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5pwd(pwd)})
        userModel.save((e,d)=>{
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,ytpe,_id} = d
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
})
function md5pwd(pwd){
    const halt = 'sajgdjasgdasasA123sa78';
    return utility.md5(utility.md5(pwd+halt))
}
Router.post('/update',(req,res)=>{
    const {userid} = req.cookies
    if(!userid){
        return res.json.dumps({code:1})
    }
    const body = req.body
    User.findOneAndUpdate(userid,body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})
Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body
    User.findOne({user:user,pwd:md5pwd(pwd)},{pwd:0,'__v':0},(err,doc)=>{
        //返回结果中不返回pwd __v _id
        console.log(doc)
        if(doc){
            res.cookie('userid',doc._id)
            return res.json({code:0,data:doc})
        }
        else{
            return res.json({code:1,msg:'用户名或密码错误'})
        }
    })
})
const _filter = {'pwd':0,'__v':0}
Router.get('/info',(req,res)=>{
    //用户有没有cookie
    console.log(req.cookies)
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json('后端出错了')
        }
        else{
            return res.json({code:0,msg:doc})
        }
    })
})


module.exports = Router