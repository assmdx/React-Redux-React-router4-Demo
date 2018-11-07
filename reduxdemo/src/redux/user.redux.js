import axios from 'axios'
import {getRedirectPath} from "./utils";

const ERROR_MSG = "ERROR_MSG"
const LOAD_DATA = "LOAD_DATA"
const AUTH_SUCCESS="AUTH_SUCCESS"
const LOGOUT="LOGOUT"
const initState = {
    redirectTo:'',
    msg:'',
    isAuth:false,
    user:'',
    type:''
}
//reducers
export function user(state=initState,action) {
    switch (action.type){
        case AUTH_SUCCESS:
            console.log(action.payload)
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOAD_DATA:
            return {...state,...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}

//包装action的返回信息
function authSuccess(data){
    return {
        type:AUTH_SUCCESS,
        payload:data
    }
}

function errorMsg(msg){
    return {
        msg,type:ERROR_MSG
    }
}

//action
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd != repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status === 200 && res.data.code===0){
                    dispatch(authSuccess({user,pwd,type}))
                }
                else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(error=>{
                console.error(error)
            })
    }
}
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
export function update(data) {
    return dispatch =>{
        axios.post('/user/update',data)
            .then(res=>{
                if(res.status === 200 && res.data.code===0){
                    console.log(res.data.data)
                    dispatch(authSuccess(res.data.data))
                }
                else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(error=>{
                console.error(error)
            })
    }
}
export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg("用户名密码必须输入")
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status === 200 && res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }
                else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
            .catch(error=>{
                console.error(error)
            })
    }

}

export function logoutSubmit() {
    return {type:LOGOUT}
}