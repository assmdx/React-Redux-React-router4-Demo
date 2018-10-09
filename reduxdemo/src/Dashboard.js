import React from 'react'
import {Route,Link,Redirect,Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
import App from './App'

function Erying(){
    return <h1>二营</h1>
}
function Qibinglian() {
    return <h1>骑兵连</h1>
}

@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component {
    render(){
        const match = this.props.match
        const redirectrirection = <Redirect to='/login'></Redirect>
        const app =(
            <div>
                <ul>
                    <li>
                        <Link to={`${match.url}`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/qibinglian`}>骑兵连</Link>
                    </li>
                    <li>
                        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button>:null}
                    </li>
                </ul>
                <Switch>
                    <Route path={`${match.url}`} exact component={App}></Route>
                    <Route path={`${match.url}/erying`}  component={Erying}></Route>
                    <Route path={`${match.url}/qibinglian`}  component={Qibinglian}></Route>
                </Switch>
            </div>
        )
        return this.props.isAuth ? app: redirectrirection
    }
}

export default Dashboard