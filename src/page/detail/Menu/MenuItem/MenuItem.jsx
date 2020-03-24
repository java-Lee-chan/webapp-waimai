import React from 'react';
import { connect } from 'react-redux';
import { addSelectItem, minusSelectItem } from '../../actions/menuAction';
import './MenuItem.scss';

const MenuItem = (props) => {
  /**
   * 添加菜品数量
   */
  const addSelectItem = () => {
    props.addSelectItem({
      index: props._index
    });
  }

  const minusSelectItem = () => {
    props.minusSelectItem({
      index: props._index
    });
  }

  const item = props.data || {};
  console.log(item);
  return (
    <div className="menu-item">
      <img src={item.picture} alt="" className="img"/>
      <div className="menu-item-right">
        <p className="item-title">{item.name}</p>
        <p className="item-desc two-line">{item.description}</p>
        <p className="item-zan">{item.praise_content}</p>
        <p className="item-price">
          ￥{item.min_price}/<span className="unit">{item.unit}</span>
        </p>
      </div>
      <div className="select-content">
        {
          item.chooseCount > 0 ? <div onClick={minusSelectItem} className="minus"></div> : null
        }
        {
          item.chooseCount > 0 ? <div className="count">{item.chooseCount}</div> : null
        }
        <div onClick={addSelectItem} className="plus"></div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({

});
export default connect(
  mapStateToProps,
  { addSelectItem, minusSelectItem }
)(MenuItem);