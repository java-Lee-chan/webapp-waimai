import React from 'react';
import { connect } from 'react-redux';
import { getOrderData } from '../actions/orderAction';
import ListItem from './ListItem/ListItem';
import ScrollView from '@/component/ScrollView/ScrollView';

import './Order.scss';

/**
 * @constructor <Order />
 * @description 订单tab代码
 */
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isend: false
    };
    this.page = 0;
  }

  loadPage() {
    this.page++;
    if (this.page > 3) {
      this.setState({
        isend: true
      });
    } else {
      this.fetchData(this.page);
    }
  }

  fetchData(page) {
    this.props.getOrderData(page);
  }

  renderList() {
    const { list } = this.props;
    return list.map((item, index) => {
      return (
        <ListItem key={index} data={item} /> 
      )
    });
  }

  componentDidMount() {
    this.fetchData(this.page);
  }

  render() {
    return (
      <div className="order-container">
        <div className="header">订单</div> 
        <ScrollView loadCallback={() => this.loadPage()} isend={this.state.isend}>
          <div className="order-list">
            {
              this.renderList()
            }
          </div>
        </ScrollView>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.orderReducer.list
});
const mapDispatchToProps = (dispatch) => ({
  getOrderData: (page) => dispatch(getOrderData(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);