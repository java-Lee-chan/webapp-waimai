import React from 'react';
import { connect } from 'react-redux';

import ListItem from '@/component/ListItem/ListItem';
import ScrollView from '@/component/ScrollView/ScrollView';
import { getListData } from '../../actions/contentListAction';
import './ContentList.scss';

/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */
class ContentList extends React.Component {
  constructor(props) {
    super(props);

    // 表示页面是否可以滚动
    this.state = {
      isend: false
    };

    // 记录当前页码
    this.page = 0
  }

  fetchData(page) {
    this.props.getListData(page);
  }

  renderItems() {
    const { list } = this.props;
    return list.map((item, index) => {
      return <ListItem key={index} itemData={item} />
    })
  }

  onLoadPage() {
    this.page++;
    if (this.page > 3) {
      this.setState({
        isend: true
      });
    } else {
      this.fetchData(this.page);
    }     
  }

  componentDidMount() {
    // 请求第一屏数据
    this.fetchData(0);
  }

  render() {
    return (
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line"></span>
          <span>附近商家</span>
          <span className="title-line"></span>
        </h4>
        <ScrollView loadCallback={() => this.onLoadPage()} isend={this.state.isend}>
          {
            this.renderItems()
          }
        </ScrollView>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.contentListReducer.list
});
const mapDispatchToProps = (dispatch) => ({
  getListData: (page) => dispatch(getListData(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);