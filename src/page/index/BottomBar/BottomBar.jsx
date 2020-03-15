import React from 'react';

import { connect } from 'react-redux';

import { changeTab } from '../actions/tabAction';

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
    this.props.changeTab({
      activeKey: item.key
    });
  }

  renderItems() {
    let { tabs } = this.props;

    return tabs.map((item) => {
      let cls = item.key + ' btn-item';
      const name = item.name;

      if (item.key === this.props.activeKey) {
        cls += ' active';
      }
      return (
        <div key={item.key} className={cls} onClick={() => this.changeTab(item)}>
          <div className="tab-icon"></div>
          <div className="btn-name">{name}</div>
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  changeTab: ({activeKey}) => dispatch(changeTab({activeKey}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar);