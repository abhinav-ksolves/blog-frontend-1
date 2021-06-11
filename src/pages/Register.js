import React, { Component} from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Error  from '../components/Error';
import {withRouter} from 'react-router-dom';
import UserContext from "../context/userContext";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errMessage: ''
    };

  }

  static contextType = UserContext;

  componentDidMount(){
    this.context.userInfo && this.props.history.push('/');
  }

  handleFormInput = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => {
        return { ...prevState, [name]: value };
      }
    );
  };

  register = (e)=>{
      e.preventDefault();
      const {username,email,password,confirmPassword} = this.state;
      if(!username || !email || !password || !confirmPassword){
          this.setState((prevState)=>{
              return { ...prevState, errMessage: "All fields are mandatory!" };
          });
      }
      else{
          fetch('/api/register',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({username,email,password,confirmPassword})
          })
          .then((response)=> response.json())
          .then((res)=>{
            this.setState((prevState)=>{
                return { username:'',email:'',password:'',confirmPassword:'', errMessage: res.msg };
            });
          })
          .catch(err=>{
              console.log(err);
          })
      }
  }

  render() {
    return (
    
      <form className="registerLoginForm">
        <div>
          <h2>Register</h2>
        </div>
        <Error message={this.state.errMessage}/>
        <Input
          typeVal="text"
          placeholderVal="Username"
          nameVal="username"
          labelVal="Username"
          inputVal={this.state.username}
          handleInputChange = {this.handleFormInput}
        />
        <Input
          typeVal="email"
          placeholderVal="Email"
          nameVal="email"
          labelVal="Email"
          inputVal={this.state.email}
          handleInputChange = {this.handleFormInput}

        />
        <Input
          typeVal="password"
          placeholderVal="Password"
          labelVal="Password"
          nameVal="password"
          inputVal={this.state.password}
          handleInputChange = {this.handleFormInput}

        />
        <Input
          typeVal="password"
          placeholderVal="Confirm password"
          labelVal="Confirm password"
          nameVal="confirmPassword"
          inputVal={this.state.confirmPassword}
          handleInputChange = {this.handleFormInput}

        />

        <div>
          <button type="submit" onClick={this.register}>Register</button>
        </div>
        <div>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    );
  }
}

export default withRouter(Register);
