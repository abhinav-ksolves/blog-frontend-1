import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             err: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
          err: true,
        };
      }
    componentDidCatch(err,errInfo){
        console.log("error",err,errInfo);
    }
    
    render() {
        return (
            <div>
                {
                    this.state.err
                    ?
                    <h1>Something went wrong!!</h1>
                    :
                    this.props.children
                }
            </div>
        )
    }
}

export default ErrorBoundary;
