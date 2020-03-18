import React from 'react';
import { connect } from 'react-redux';

import ListItem from '@/component/ListItem/ListItem';
import ScrollView from '@/component/ScrollView/ScrollView';
import { getListData } from '../actions/contentListAction';
import './ContentList.scss';

/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */
class ContentList extends React.Component {

  fetchData() {
    this.props.getListData();
  }

  renderItems() {
    const list = this.props.list || [];
    return list.map((item, index) => {
      return <ListItem key={index} itemData={item} />
    })
  }

  onLoadPage() {
    if (this.props.page <= 3) {
      this.fetchData();
    }     
  }

  componentDidMount() {
    // 请求第一屏数据
    this.fetchData();
  }

  render() {
    return (
      <div className="list-content">
        <ScrollView loadCallback={() => this.onLoadPage()} isend={this.props.isend}>
          {
            this.renderItems()
          }
        </ScrollView>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.contentListReducer.list,
  page: state.contentListReducer.page,
  isend: state.contentListReducer.isend
});
const mapDispatchToProps = (dispatch) => ({
  getListData: () => dispatch(getListData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);