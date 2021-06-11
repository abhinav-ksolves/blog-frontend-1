import React, { Component } from "react";
import { withRouter,Link } from "react-router-dom";
import {EditRounded,DeleteRounded} from '@material-ui/icons';
import UserContext from "../context/userContext";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  getUserPosts = ()=>{
    fetch(`/api/getUserPosts/${this.context.userInfo.uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ posts: res.posts });
        })
        .catch((err) => {
          console.log(err);
        })
  }

  static contextType = UserContext;

  componentDidMount() {
    this.context.userInfo
      ? 
      this.getUserPosts()
      : this.props.history.push("/login");
  }

  deletePost = (postId) =>{
    fetch(`/api/deletePost`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({post_id:postId})
      })
        .then((response) => response.json())
        .then((res) => {
          this.getUserPosts();
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
               <Link to={{pathname:'/edit-post',state:{post:post}}}>
                   <EditRounded color="primary" className="edit"/>
                </Link>
                <DeleteRounded color="secondary" className="delete" onClick={()=>this.deletePost(post.pid)}/>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}

export default withRouter(Posts);
