import * as React from 'react';
import { Route } from 'react-router-dom';

export interface RouteProps {
  path: string;
  // tslint:disable-next-line:no-any
  component: any;
  exact?: boolean;
  routes?: RouteProps[];
  needAuth?: boolean;
}

const RouteWithSubRoutes = (route: RouteProps) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => {
      return <route.component {...props} routes={route.routes} />;
    }}
  />
);

export default RouteWithSubRoutes;
