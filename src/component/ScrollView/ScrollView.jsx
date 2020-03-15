import React from 'react';
import Loading from '@/component/Loading/Loading';
import './ScrollView.scss';

/**
 * @constructor <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */
class ScrollView extends React.Component {

  onLoadPage() {
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    const proLoadDis = 30;

    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      if (!this.props.isend) {
        this.props.loadCallback && this.props.loadCallback();
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => this.onLoadPage());
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.onLoadPage());
  }

  render() {
    return (
      <div className="scrollview">
        {
          this.props.children
        }
        <Loading isend={this.props.isend}/>
      </div>
    )
  }
}

export default ScrollView;