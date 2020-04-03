import React, { Component } from 'react';

class IFrame extends Component {
  render() {
    return (
      <div title="selected" className="iframe">
        <iframe src={this.props.selected}></iframe>
      </div>
    )
  }
}

export default IFrame;
