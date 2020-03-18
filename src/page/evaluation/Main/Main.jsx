import './Main.scss';
import React from 'react';
import NavHeader from '@/component/NavHeader/NavHeader'

class Main extends React.Component {
  constructor(props) {
    super(props);

    // 做多可输入的字符数
    this.maxCount = 140;
    this.state = {
      // 还剩多少字符可输入
      count: this.maxCount,
      // 用户当前点击的星位置
      starIndex: 0
    }
    this.commentInput = React.createRef();
  }

  /**
   * 用户输入回调
   */
  handleInput(value) {
    const num = value.length;
    if (!this.chineseInputing) {
      this.setState({
        count: this.maxCount - num
      });
    }
  }

  /**
   * 点击评分
   */
  doEva(i) {
    this.setState({
      starIndex: i + 1
    });
  }

  /**
   * 渲染评分用的星
   */
  renderStar() {
    const arr = [];
    const { starIndex } = this.state;
    for (let i = 0; i < 5; i++) {
      let cls = i >= starIndex ? 'star-item' : 'star-item light';
      arr.push(
        <div onClick={() => this.doEva(i)} key={i} className={cls}></div>
      )
    }
    return arr;
  }

  componentDidMount() {
    this.commentInput.current.addEventListener('compositionstart', () => {
      this.chineseInputing = true;
    });
    this.commentInput.current.addEventListener('compositionend', (e) => {
      this.chineseInputing = false;
      this.handleInput(e.target.value);
    });
  }

  render() {
    return (
      <div className="content">
        <NavHeader title='评价' />
        <div className="eva-content">
          <div className="star-area">
            {
              this.renderStar()
            }
          </div>
          <div className="comment">
            <textarea ref={this.commentInput} onChange={(e) => this.handleInput(e.target.value)} 
              maxLength="140" placeholder="亲，菜品的口味如何，商家的服务是否周到？" className="comment-input">
            </textarea>
            <span className="count">{this.state.count}</span>
          </div>
          <p className="one-line product-name">后切鸡排 香辣口水鸡饭，中辣</p>
        </div>
        <div className="submit">提交评价</div>
      </div>
    )
  }
}

export default Main;