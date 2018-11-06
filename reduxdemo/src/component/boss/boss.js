import React from 'react'
import axios from 'axios'
import {Card,WhiteSpace,WingBlank,List} from 'antd-mobile'
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=genius')
            .then(res=>{
                if(res.data.code === 0){
                    this.setState({data:res.data.data})
                }
            })
    }
    render(){
        console.log(this.state)
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.state.data.map(v=>(
                    v.avatar !=undefined ?
                        <Card
                            key={v._id}
                        >
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Card.Body>
                        </Card>
                    :null
                ))}
            </WingBlank>
        )

    }
}
export default Boss