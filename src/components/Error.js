import React, { Component } from 'react';

export class Error extends Component {
    
    
    render() {
        const {message} = this.props;
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Error;

