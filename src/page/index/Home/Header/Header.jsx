import React from 'react';

import './Header.scss';
import banner from './img/banner.jpeg';

import SearchBar from '../SearchBar/SearchBar';

/**
 * @constructor <Header />
 * @description 首页header代码
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <SearchBar />
        <img className="banner-img" src={banner} />
      </div>
    )
  }
}

export default Header;