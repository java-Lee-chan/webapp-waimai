import React from 'react';
import { connect } from 'react-redux';
import { changeTab, getFilterData, changeFilter } from '../actions/headerAction';
import { getListData } from '../actions/contentListAction';
import { TABKEY } from '../config';
import './Header.scss';

class Header extends React.Component {

  fetchData() {
    this.props.getFilterData();
  }

  revertActive(key, dataList) {
    if (key === TABKEY.cate) {
      for (let i = 0; i < dataList.length; i++) {
        for (let j = 0; j < dataList[i].sub_category_list.length; j++) {
          dataList[i].sub_category_list[j].active = false;
        }
      }
    } else if (key === TABKEY.type) {
      for (let x = 0; x < dataList.length; x++) {
        dataList[x].active = false;
      }
    } else {
      for (let k = 0; k < dataList.length; k++) {
        for (let o = 0; o < dataList[k].items.length; o++) {
          dataList[k].items[o].active = false;
        }
      }
    }
  }

  /**
   * 变化当前点击的item状态，同时发起filter请求
   */
  changeDoFilter(item, key, dataList) {
    this.revertActive(key, dataList);
    item.active = true;
    this.props.changeFilter({ item, key });
    this.props.getListData({
      filterData: item,
      toFirstPage: true
    });
  }

  /**
   * 点击切换 tab
   * @param {*} activeKey 
   */
  changeTab(activeKey) {
    let closePanel = false;
    // 如果前后点击的是同一个 tab 就关闭 panel
    if (this.props.activeKey === activeKey && !this.props.closePanel) {
      closePanel = true;
    }
    this.props.changeTab({ activeKey, closePanel });
  }

  /**
   * 渲染顶部默认tab
   */
  renderTabs() {
    const tabs = this.props.tabs || {};
    const array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + ' item';
      if (item.key === this.props.activeKey && !this.props.closePanel) {
        cls += ' current';
      }

      array.push(
        <div className={cls} key={item.key} onClick={() => this.changeTab(item.key)}>
          {item.text}
        </div>
      )
    }
    return array;
  }

  /**
   * 全部分类内类目
   */
  renderCateInnerContent(item, cateList) {
    return item.sub_category_list.map((sub_item) => {
      const cls = sub_item.active ? 'cate-box-inner active' : 'cate-box-inner';
      return (
        <div onClick={() => this.changeDoFilter(sub_item, TABKEY.cate, cateList)} className="cate-box" key={sub_item.code}>
          <div className={cls}>
            {sub_item.name}({sub_item.quantity})
          </div>
        </div>
      )
    });
  }

  /**
   * 全部分类外类目
   */
  renderCateContent() {
    const cateList = this.props.filterData.category_filter_list || [];

    return cateList.map((cate) => (
      <li key={cate.code} className="cate-item">
        <p className="item-title">
          {cate.name}
          <span className="item-count">{cate.quantity}</span>
        </p>
        <div className="item-content clearfix">
          {
            this.renderCateInnerContent(cate, cateList)
          }
        </div>
      </li>
    ))
  }

  /**
   * 综合排序类目
   */
  renderTypeContent() {
    const typeList = this.props.filterData.sort_type_list || [];
    
    return typeList.map((type) => {
      const cls = type.active ? 'type-item active' : 'type-item';
      return (
        <li onClick={() => this.changeDoFilter(type, TABKEY.type, typeList)} key={type.code} className={cls}>
          { type.name }
        </li>
      )
    })
  }

  /**
   * 筛选内部类目
   */
  renderFilterInnerContent(items, filterList) {
    return items.map((item) => {
      let cls = item.icon ? 'cate-box-inner has-icon' : 'cate-box-inner';
      if (item.active) {
        cls += ' active';
      }
      return (
        <div onClick={() => this.changeDoFilter(item, TABKEY.filter, filterList)} className="cate-box" key={item.code}>
          <div className={cls}>
            {item.icon ? <img src={item.icon} /> : null}{item.name}
          </div>
        </div>
      )
    })
  }

  /**
   * 筛选外面类目
   */
  renderFilterContent() {
    const filterList = this.props.filterData.activity_filter_list || [];

    return filterList.map((filter, index) => {
      return (
        <li key={index} className="filter-item">
          <p className="filter-title">
            { filter.group_title }
          </p>
          <div className="item-content clearfix">
            {
              this.renderFilterInnerContent(filter.items, filterList)
            }
          </div>
        </li>
      )
    })
  }

  /**
   * 渲染过滤面板
   */
  renderContent() {
    const tabs = this.props.tabs || {};
    const array = [];
    for(let key in tabs) {
      const item = tabs[key];
      let cls = item.key + '-panel';
      if (item.key === this.props.activeKey) {
        cls = ' current';
      }

      if (item.key === TABKEY.cate) {
        array.push(
          <ul key={item.key} className={cls}>
            {
              this.renderCateContent()
            }
          </ul>
        );
      } else if (item.key === TABKEY.type) {
        array.push(
          <ul key={item.key} className={cls}>
            {
              this.renderTypeContent()
            }
          </ul>
        );
      } else {
        array.push(
          <ul key={item.key} className={cls}>
            {
              this.renderFilterContent()
            }
          </ul>
        );
      }
    }

    return array;
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let cls = 'panel';
    if (!this.props.closePanel) {
      cls += ' show';
    }
    return (
      <div className="header">
        <div className="header-top">
          {
            this.renderTabs()
          }
        </div>
        <div className={cls}>
          <div className="panel-inner">
            {
              this.renderContent()
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: state.headerReducer.tabs,
  activeKey: state.headerReducer.activeKey,
  filterData: state.headerReducer.filterData,
  closePanel: state.headerReducer.closePanel
});
const mapDispatchToProps = (dispatch) => ({
  changeTab: (obj) => dispatch(changeTab(obj)),
  getFilterData: () => dispatch(getFilterData()),
  changeFilter: (obj) => dispatch(changeFilter(obj)),
  getListData: (obj) => dispatch(getListData(obj))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);