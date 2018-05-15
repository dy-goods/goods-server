import * as React from 'react';
import { Redirect } from 'react-router';
import { Switch, HashRouter as Router } from 'react-router-dom';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
import Test from './pages/Test';

const routes = [
  {
    path: '/test',
    component: Test,
    exact: true,
  },
];

export default () => (
  <Router>
    <Switch>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      <Redirect from="/" to="/test" />
    </Switch>
  </Router>
);
