import React, { Component } from "react";

class Input extends Component {
  render() {
    const {
      typeVal='',
      placeholderVal='',
      labelVal='',
      nameVal='',
      inputVal='',
      handleInputChange,
    } = this.props;
    return (
      <div>
        <label>{labelVal}</label>
        <input
          type={typeVal}
          name={nameVal}
          placeholder={placeholderVal}
          value={inputVal}
          onChange={handleInputChange}
          required
        />
      </div>
    );
  }
}

export default Input;
