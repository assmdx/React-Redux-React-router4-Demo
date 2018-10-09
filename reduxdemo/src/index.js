// 登录
//     没有登录信息 统一跳转login
// 页面  导航 + 显示 + 注销
//     一营
//     二营
//     骑兵连
// router + redux

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import {createStore,applyMiddleware,compose} from 'redux'
//applyMIddleware 用于管理中间件 redux-thunk
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducers from './reducer'
import Auth from './Auth'
import Dashboard from './Dashboard'
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f=>f //chrome redux 调试工具
))
//console.log(store.getState())
function render (){
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' exact component={Auth}></Route>
                    <Route path='/dashboard'  component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>
                </Switch>
            </BrowserRouter>
        </Provider>,document.getElementById('root')
    )
}
render()

store.subscribe(render)


