import React from 'react';
import './ListItem.scss';

function ListItem(props) {

  /**
   * 渲染具体菜品
   */
  const renderProduct = (data) => {
    const list = data.product_list;

    const mapList = list.map((item, index) => {
      return (
        <div className="product-item" key={index}>
          {item.product_name}
          <div className="product-count">
            x{item.product_count}
          </div>
        </div>
      )
    });
    mapList.push(
      (
        <div className="product-item" key={list.length}>
          <span>...</span>
          <div className="product-total-count">
            总计{data.product_count}个菜，实付
            <span className="total-price">
            ￥{data.total}
            </span>
          </div>
        </div>
      )
    );
    return mapList;
  }

  /**
   * 渲染评价按钮
   */
  const renderComment = (data) => {
    const evaluation = !data.is_comment;
    if (evaluation) {
      return (
        <div className="evaluation clearfix">
          <div className="evaluation-btn">评价</div>
        </div>
      );
    }
    return null;
  }

  const data = props.data || {};

  return (
    <div className="order-item">
      <div className="order-item-inner">
        <img className="item-img" src={data.poi_pic} />
        <div className="item-right">
          <div className="item-top">
            <p className="order-name one-line">{data.poi_name}</p>
            <div className="arrow"></div>
            <div className="order-state">{data.status_description}</div>
          </div>
          <div className="item-bottom">
            {
              renderProduct(data)
            }
          </div>
        </div>
      </div>
      {
        renderComment(data)
      }
    </div>
  )
}

export default ListItem;