import React from 'react';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

// import { changeTab } from '../actions/tabAction';

import './BottomBar.scss';

/**
 * @constructor <BottomBar>
 * @description 首页底部tab栏
 */

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  changeTab = (item) => {
    // this.props.changeTab({
    //   activeKey: item.key
    // });
    this.props.history.replace(item.key);
  }

  renderItems() {
    let { tabs } = this.props;

    return tabs.map((item) => {
      let cls = item.key + ' btn-item';
      const name = item.name;
      return (
        <NavLink key={item.key} className={cls} 
          replace={true} to={"/" + item.key} activeClassName="active" onClick={() => this.changeTab(item)}>
          <div className="tab-icon"></div>
          <div className="btn-name">{name}</div>
        </NavLink>
      )
    });
  }

  render() {
    return (
      <div className="bottom-bar">
        {
          this.renderItems()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tabs: state.tabReducer.tabs,
  activeKey: state.tabReducer.activeKey,
});

// const mapDispatchToProps = (dispatch) => ({
//   changeTab: ({activeKey}) => dispatch(changeTab({activeKey}))
// })

export default withRouter(connect(
  mapStateToProps,
  // mapDispatchToProps
)(BottomBar));