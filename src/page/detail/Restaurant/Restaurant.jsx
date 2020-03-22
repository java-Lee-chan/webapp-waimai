import React from 'react';
import { connect } from 'react-redux';

class Restaurant extends React.Component {
  render() {
    return (
      <div>
        Restaurant
      </div>
    )
  }
}

export default connect()(Restaurant);