import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import UserContext from '../context/userContext';

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts: []
        }
    }

    static contextType = UserContext;

    componentDidMount(){
        
        this.context.userInfo
        ?
        fetch('/api/allApprovedPosts',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            this.setState({posts: res.allPosts});
        })
        .catch((err)=>{
            console.log(err);
        })
        :
        this.props.history.push('/login');
    }

    
    render() {
        const {posts} = this.state;
        return (
            <div className="main">
               {
                   posts.map((post) => {
                      return (
                      <div key={post.pid}>
                        <h2 className="postTitle">{post.title}</h2>
                        <p className="postBody">{post.body.length > 200 ? post.body.slice(0,201) : post.body}
                        <Link to={`/post/${post.pid}`}>....read more</Link></p>
                      </div>
                      )
                   })
               }
            </div>
        )
    }
}

export default withRouter(Home);
