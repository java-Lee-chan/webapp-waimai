import React from 'react';
import { connect } from 'react-redux';

class Comment extends React.Component {
  render() {
    return (
      <div>
        Comment
      </div>
    )
  }
}

export default connect()(Comment);