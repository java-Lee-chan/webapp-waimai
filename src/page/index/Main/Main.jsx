import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../Home/Home';
import Order from '../Order/Order';
import My from '../My/My';
import BottomBar from '../BottomBar/BottomBar';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/home" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/my" component={My} />
        <BottomBar />
      </div>
    );
  }
}

export default Main;