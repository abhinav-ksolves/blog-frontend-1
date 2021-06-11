import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Error from '../components/Error';
import {withRouter} from 'react-router-dom';
import UserContext from "../context/userContext";

class Login extends Component {
  constructor(props) {
      super(props)
  
      this.state = {
           email: '',
           password: '',
           errMessage: ''
      }
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

  login = (e)=>{
         e.preventDefault();
        const {email,password} = this.state;
        if(!email || !password) {
            this.setState((prevState)=>{
                return {...prevState,errMessage:"All fields are mandatory"};
            })
        }
        else{
            fetch('/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email,password})
            })
            .then((response)=>response.json())
            .then((res)=>{
                if(res.msg !== 'login successful') {
                    this.setState({ email:'',password:'',errMessage: res.msg });
                    return;
                }
                this.props.setUserInfo();
                this.props.history.push('/');

            })
        }
  }


  render() {
    const {email,password} = this.state;
    return (
        
        <form className="registerLoginForm">
        <div>
          <h2>Login</h2>
        </div>
        <Error message={this.state.errMessage}/>
        <Input typeVal="email" placeholderVal="Email" nameVal="email" labelVal="Email" inputVal={email} handleInputChange={this.handleFormInput} />
        <Input
          typeVal="password"
          placeholderVal="Password"
          labelVal="Password"
          nameVal="password"
          inputVal={password}
          handleInputChange={this.handleFormInput}
        />

        <div>
          <button onClick={this.login}>Login</button>
        </div>
        <div>
          <span>
            No Account? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    
    );
  }
}

export default withRouter(Login);
