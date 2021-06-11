import React, { Component } from "react";
import Input from "../components/Input";
import Error from '../components/Error';
import {withRouter} from 'react-router-dom';
import UserContext from "../context/userContext";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      errMessage: '',
      file: '',
    };
  }

  static contextType = UserContext;

  handleFormInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  componentDidMount(){
      !this.context.userInfo && this.props.history.push('/login');
  }
  createPost = (e)=>{
      e.preventDefault();
      const {title,body,file} = this.state;
      if(!title || !body || !file){
        this.setState((prevState)=>{
            return {...prevState,errMessage:"All fields are mandatory"};
        });
        return; 
      } 

      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("title", title);
      formData.append("body", body);
      formData.append("uid", this.context.userInfo.uid);
      formData.append("username", this.context.userInfo.username);

      fetch('/api/createPost',{
          method: 'POST',
          headers: {
          },
          body: formData
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log(res.message);
            this.props.history.push('/posts');
        })
        .catch((err)=>{
            console.log(err);
        })
  }

  saveFile = (e) => {
    console.log(e.target.files[0]);
    this.setState((prevState)=>{
      return {...prevState,file:e.target.files[0],filename:e.target.files[0].name};
  });
  };

  render() {
    const { title, body ,errMessage} = this.state;
    return (
        
        <form className="createPost">
        <Error message={errMessage}/>
          <Input
            typeVal="text"
            labelVal="Title"
            nameVal="title"
            placeholderVal="Enter title"
            inputVal={title}
            handleInputChange={this.handleFormInput}
          />
          <div>

          <textarea name="body" onChange={this.handleFormInput} placeholder="Enter body" value={body} required/>
          </div>
          <div className="blogImgContainer">
            <input type="file" onChange={this.saveFile} required/>
          </div>
          <div>
          <button type="submit" onClick={this.createPost}>Submit</button>
          </div>
        </form>
        
    );
  }
}

export default withRouter(CreatePost);
