import React, { Component } from 'react';

class IFrame extends Component {
  render() {
    return (
      <div className="iframe">
        <iframe title="selected" src={this.props.selected}></iframe>
      </div>
    )
  }
}

export default IFrame;
