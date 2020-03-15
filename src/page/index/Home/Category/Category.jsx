import React from 'react';

import { connect } from 'react-redux';

import { getHeaderData } from '../../actions/categoryAction';

import './Category.scss';

/**
 * @constructor <Category />
 * @description 外卖类别
 */
class Category extends React.Component {

  fetchData() {
    this.props.getHeaderData();
  }

  renderItems() {
    let { items } = this.props;

    items = items.splice(0, 8);

    return items.map((item) => {
      return (
        <div key={item.code} className="category-item">
          <img className="item-icon" src={item.url} />
          <div className="item-name">{item.name}</div>
        </div>
      )
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className="category-content clearfix">
        {
          this.renderItems()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.categoryReducer.items
});

const mapDispatchToProps = (dispatch) => ({
  getHeaderData: () => dispatch(getHeaderData())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);