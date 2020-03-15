import React from 'react';

import './ListItem.scss';

/**
 * @constructor <ListItem />
 * @description 列表单个组件
 */
class ListItem extends React.Component {
  
  /**
   * 渲染是否是新到和品牌标签
   * @param {*} item 
   */
  renderBrand(item) {
    if (item.brand_type) {
      return <div className="brand brand-pin">品牌</div>
    } else {
      return <div className="brand brand-xin">新到</div>
    }
  }

  /**
   * 渲染5颗星得分方法
   * @param {*} item 
   */
  renderScore(item) {
    const wm_poi_score = item.wm_poi_score || '';

    const score = wm_poi_score.toString();

    const scoreArray = score.split('.');

    // 满星个数
    const fullstar = parseInt(scoreArray[0]);

    // 半星个数
    const halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;

    // 0星个数
    const nullstar = 5 - fullstar - halfstar;

    const starjsx = [];

    // 渲染满星jsx
    for (let i = 0; i < fullstar ; i++) {
      starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
    }

    // 渲染半星jsx
    if (halfstar) {
      for (let j = 0; j < halfstar ; j++) {
        starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
      }
    }

    // 渲染0星jsx
    if (nullstar) {
      for (let k = 0; k < nullstar ; k++) {
        starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
      }
    }

    return starjsx;
  }

  /**
   * 渲染月售数量
   * @param {*} item 
   */
  renderMonthNum(item) {
    const num = item.month_sale_num;

    // 大于999采用 999+
    if (num > 999) {
      return '999+';
    } else {
      return num;
    }
  }

  /**
   * 是否需要渲染美团专送 tag
   * @param {*} item 
   */
  renderMeituanFlag(item) {
    if (item.delivery_type) {
      return <div className="item-meituan-flag">美团专送</div>
    } else {
      return null;
    }
  }

  /**
   * 渲染商家活动
   * @param {*} item 
   */
  renderOthers(item) {
    const discounts = item.discounts2;
    return discounts.map((discount) => {
      return (
        <div className="other-info" key={discount.id}>
          <img src={discount.icon_url} className="other-tag" />
          <div className="other-content">{discount.info}</div>
        </div>
      )
    });
  }

  render() {

    const { itemData } = this.props;

    return (
      <div className="item-content scale-1px">
        <img className="item-img" src={itemData.pic_url} />
        {
          this.renderBrand(itemData)
        }
        <div className="item-info-content">
          <p className="item-title">{itemData.name}</p>
          <div className="item-desc clearfix">
            <div className="item-score">
              {
                this.renderScore(itemData)
              }
            </div>
            <div className="item-count">
              月售
              {
                this.renderMonthNum(itemData)
              }
            </div>
            <div className="item-distance">&nbsp;{itemData.distance}</div>
            <div className="item-time">{itemData.mt_delivery_time}&nbsp;|</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price">{itemData.min_price_tip}</div>
            {
              this.renderMeituanFlag(itemData)
            }
          </div>
          <div className="item-others">
            {
              this.renderOthers(itemData)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;

