import React, { Component } from 'react';
import {Cancel,CheckCircleRounded} from '@material-ui/icons';
import {withRouter} from 'react-router-dom';
import UserContext from '../context/userContext';

class ManagePosts extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             posts: []
        }
    }

    static contextType = UserContext;

    getAllPosts = ()=>{
        fetch('/api/allPosts',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((res)=>{
            this.setState({posts: res.allPosts})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    componentDidMount(){
        
        this.context.userInfo && this.context.userInfo.isAdmin
        ?
        this.getAllPosts()
        :
        this.props.history.push('/login');
    }

    approvePost = (postId)=>{
        fetch('/api/approvePost',{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pid: postId})
        })
        .then((response)=>response.json())
        .then((res)=>{
            this.getAllPosts();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    deletePost = (postId)=>{
        fetch(`/api/deletePost`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({post_id:postId})
          })
            .then((response) => response.json())
            .then((res) => {
              this.getAllPosts();
            })
            .catch((err) => {
              console.log(err);
        })
    }

    render() {
        return (
            <div className="main">
            <div className="posts">
            {this.state.posts.map((post) => {
              return(
                <div className="card" key={post.pid}>
                  <div>
                    Title : <span>{post.title}</span>
                  </div>
                  <div>
                    Approved: <span style={{color: post.approved ? "green" : "red"}}>{post.approved ? 'YES' : 'NO'}</span>
                  </div>
                  <div>
                    <CheckCircleRounded  className="approveIcon" onClick={()=>this.approvePost(post.pid)}/>
                    <Cancel color="secondary" className="rejectIcon" onClick={()=>this.deletePost(post.pid)}/>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )
    }
}

export default withRouter(ManagePosts);
