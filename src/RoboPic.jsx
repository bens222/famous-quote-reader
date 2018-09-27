import React from 'react';

class RoboPic extends React.Component {
    render() {
      return (
        <img src={ this.props.src } alt='Robot!' />
      )
    }
}

export default RoboPic
