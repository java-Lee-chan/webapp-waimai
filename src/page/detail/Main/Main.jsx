import React from 'react';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import './Main.scss';
import NavHeader from '@/component/NavHeader/NavHeader';
import Menu from '../Menu/Menu';
import Comment from '../Comment/Comment';
import Restaurant from '../Restaurant/Restaurant';

const Main = (props) => {
  
  const changeTab = () => {

  }
  
  const renderTabs = () => {
    const tabs = props.tabs || [];
    return tabs.map((item) => {
      return (
        <NavLink replace={true} to={'/' + item.key} key={item.key} activeClassName="active" 
          className="tab-item" onClick={changeTab}>{item.name}</NavLink>
      )
    });
  }

  return (
    <div className="detail">
      <NavHeader title={'黄焖鸡'} />
      <div className="tab-bar">
        {
          renderTabs()
        }
      </div>
      <div className="tab-content">
        <Route exact path="/menu" component={Menu} />
        <Route path="/comment" component={Comment} />
        <Route path="/restaurant" component={Restaurant} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  tabs: state.tabReducer.tabs
});

export default connect(
  mapStateToProps
)(Main);