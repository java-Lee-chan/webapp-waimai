import React from 'react';
import './My.scss';

function My() {
  return (
    <div className="my-container">
      <div className="header">
        <img className="avatar" src="http://i.waimai.meituan.com/static/img/default-avatar.png" alt="avatar"/>
        <p className="nickname">XIAOMING &gt;</p>
      </div>
      <div className="content">
        <ul className="items">
          <li className="address">收货地址管理</li>
          <li className="money">商家代金券</li>
        </ul>
        <ul className="items">
          <li className="email">意见反馈</li>
          <li className="question">常见问题</li>
        </ul>
        <p className="tel">客服电话:&nbsp;101-097-77</p>
        <p className="time">服务时间:&nbsp;9:00-23:00</p>
      </div>
    </div>
  )
}

export default My;