import React, { PureComponent, lazy } from 'react';
import { withRouter} from "react-router-dom";
import {ThumbUpAlt} from '@material-ui/icons';
import Input from '../components/Input';
import Img from '../components/Img';
import UserContext from '../context/userContext';

const Comments = lazy(()=> import('../components/Comments'));

class Post extends PureComponent {
    
     _isMounted = true;

    constructor(props) {
        super(props);

        this.state = {
            post: {},
            comments: [],
            comment: ''
        }
        
    }
    
    static contextType = UserContext;

    componentDidMount(){
        this._isMounted = true;
        !this.context.userInfo && this.props.history.push('/login');
        this.context.userInfo && this.getPost(this.props.match.params.id);
    }

    componentDidUpdate(){
        this.context.userInfo && this.getAllComments(this.props.match.params.id);
    }

    componentWillUnmount(){
        this._isMounted = false;
    }


    getPost = (postId)=>{
        
        fetch(`/api/post/${postId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then((response)=>response.json())
          .then((res)=>{
              this.setState({...this.state,post: res.post})
          })
          .catch((err)=>{
              console.log(err);
          })
    }

    putLike = ()=>{
        !this.state.post.likeUserId.includes(this.context.userInfo.uid) 
        && 
        fetch('/api/putLikes',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: this.context.userInfo.uid ,pid:this.props.match.params.id})
          })
          .then((response)=>response.json())
          .then((res)=>{
              this.getPost(this.props.match.params.id);
          })
          .catch((err)=>{
              console.log(err);
          })
    }

    createComment = ()=>{
        fetch('/api/createComment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: this.state.comment,username:this.context.userInfo.username  ,user_id: this.context.userInfo.uid ,post_id:this.props.match.params.id})
          })
          .then((response)=>response.json())
          .then((res)=>{
              this.setState((prevState) => ({ ...prevState, comment: '' }));
          })
          .catch((err)=>{
              console.log(err);
          })
    }

    getAllComments = (postId)=>{
        fetch(`/api/allPostComments/${postId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then((response)=>response.json())
          .then((res)=>{
              this._isMounted && this.setState({...this.state,comments: res.allComments})
          })
          .catch((err)=>{
              console.log(err);
          })
    }

    handleCommentInput = (e)=>{
        const { name, value } = e.target;
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    }
    
    render() {
        const {post,comments,comment} = this.state;
        return (
            <div className="main">
               <div>
               {post.image && <Img imgSrc={post.image}/>}
               <h2 className="postTitle">{post.title}</h2>
               <h3 className="author-date"><span>{post.author}</span><span>{post.dateCreated && post.dateCreated.split('T')[0]}</span></h3>
               <p className="postBody">{post.body}</p>
               <div className="like-comment">
                   <div><ThumbUpAlt color="secondary" onClick={this.putLike} className="likeBtn"/> {post.likes}</div>
                   <div><Input typeVal="text" inputVal={comment} nameVal= 'comment' handleInputChange={this.handleCommentInput} placeholderVal="Add comment" /><button onClick={this.createComment}>Add</button></div>
               </div>
               </div>
               {
                   comments.length > 0
                   &&
                   <Comments comments={comments} />
               }
            </div>
        )
    }
}

export default withRouter(Post);
