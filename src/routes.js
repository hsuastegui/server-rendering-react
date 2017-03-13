import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';

import App from './components/app';
import Home from './components/home';
import List from './components/list';

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} />
    </Route>
  </Router>
);

export default Routes;
