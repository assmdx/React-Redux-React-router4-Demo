//单独使用redux
import {createStore} from 'redux'
//新建store
//通过reducer
//根据旧的state和action生成新的state
function counter(state=0,action){
    switch(action.type){
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state + 1;
        default:
            return 10;
    }
}
//新建store
const store = createStore(counter)

const init = store.getState()
console.log(init)




function listener() {
    const current = store.getState()
    console.log(current)
}
store.subscribe(listener)
//派发事件 传递action
store.dispatch({type:'加机关枪'})
//派发事件
store.dispatch({type:'减机关枪'})