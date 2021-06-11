import React, { Component } from "react";
import { Link ,withRouter} from "react-router-dom";
import UserContext from '../context/userContext';

class Header extends Component {

  logout = ()=>{
       fetch('/api/logout',{
         method: 'GET',
         headers:{
           'Content-Type': 'application/json'
         }
       })
       .then((response)=> response.json())
       .then((res)=>{
          this.props.setUserInfo();
          this.props.history.push('/login');
       })
       .catch((err)=>{
         console.log(err);
       })
  }

  static contextType = UserContext;

  render() {
    const { userInfo } = this.context;
    return (
      <div className="header">
        <div className="leftContainer">
          <Link to="/">
            <span>Blogger</span>
          </Link>
          {userInfo ? (
            <span onClick={this.logout}>Logout</span>
          ) : (
            <>
              <Link to="/register">
                <span>Register</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
        {userInfo && (
          <div className="rightContainer">
            <Link to="/create-post">
              <span>Create post</span>
            </Link>
            {
              userInfo && userInfo.isAdmin &&
              <Link to="/manage-posts">
              <span>Manage posts</span>
            </Link>
            }
            <Link to="/posts">
              <span>Your posts</span>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
