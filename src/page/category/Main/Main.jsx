import React from 'react';

import NavHeader from '@/component/NavHeader/NavHeader';
import Header from '../Header/Header';
import ContentList from '../ContentList/ContentList';

function Main() {
  return (
    <div className="category">
      <NavHeader title="分类"/>
      <Header />
      <ContentList />
    </div>
  )
}

export default Main;