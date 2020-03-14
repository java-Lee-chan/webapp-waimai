import React from 'react';

import { connect } from 'react-redux';

import { addTodo } from '../actions/tabAction';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.addTodo({
      num: 10
    });
  }

  render() {
    const { num } = this.props;
    return (
      <div onClick={this.handleClick}>{num}</div>
    );
  }
}

const mapStateToProps = (state) => ({
   num: state.tabReducer.num
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodo(obj))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);