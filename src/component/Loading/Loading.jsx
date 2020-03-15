import React from 'react';
import './Loading.scss';

/**
 * Loading组件
 * @param {*} props 
 */
function Loading(props) {
  return (
    <div className="loading">
      {
        props.isend ? '已完成' : '加载中'
      }
    </div>
  )
}

export default Loading;