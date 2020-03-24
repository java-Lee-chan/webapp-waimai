import React from 'react';
import { connect } from 'react-redux';
import { getListData, itemClick } from '../actions/menuAction';
import './Menu.scss';
import MenuItem from './MenuItem/MenuItem';

/**
 * 点菜tab页面
 * @description <Menu/>
 */
class Menu extends React.Component {

  /**
   * 点击切换右边数据
   */
  itemClick(index) {
    this.props.itemClick({currentLeftIndex: index});
  }

  renderRightList(spus) {
    const _spus = spus || [];
    return _spus.map((item, index) => {
      if (!item.chooseCount) {
        item.chooseCount = 0;
      }
      return (
        <MenuItem key={item.id} data={item} _index={index}>
        </MenuItem>
      )
    })
  }
  
  /**
   * 渲染右边的列表
   */
  renderRight() {
    const index = this.props.currentLeftIndex;
    const list = this.props.listData.food_spu_tags || [];
    const currentItem = list[index];
    if (currentItem) {
      const title = <p key={1} className="right-title">{currentItem.name}</p>
      return [
        title,
        <div key={2} className="right-list">
          <div className="right-list-inner">
            {
              this.renderRightList(currentItem.spus)
            }
          </div>
        </div>
      ]
    } else {
      return null
    }
  }

  /**
   * 渲染左边的列表
   */
  renderLeft() {
    const list = this.props.listData.food_spu_tags || [];

    return list.map((item, index) => {
      let cls = this.props.currentLeftIndex === index ? 'left-item active' : 'left-item';
      return (
        <div onClick={() => this.itemClick(index)} key={item.tag} className={cls}>
          <div className="item-text">
            { item.icon ? <img className="item-icon" src={item.icon} /> : null }
            { item.name }
          </div>
        </div>
      )
    })
  }

  componentDidMount() {
    this.props.getListData();
  }

  render() {
    return (
      <div className="menu-inner">
        <div className="left-bar">
          <div className="left-bar-inner">
            {
              this.renderLeft()
            }
          </div>
        </div>
        <div className="right-content">
          {
            this.renderRight()
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  listData: state.menuReducer.listData,
  currentLeftIndex: state.menuReducer.currentLeftIndex
})

export default connect(
  mapStateToProps,
  {getListData, itemClick}
)(Menu);