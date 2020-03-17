import React from 'react';

import './NavHeader.scss';

/**
 * 导航栏
 * @param {*} props 
 */
function NavHeader(props) {
  return (
    <div className="nav">
      <div className="back-icon">
      </div>
      <h4 className="title">{props.title}</h4>
    </div>
  )
}

export default NavHeader;