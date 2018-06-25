// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import IssuesLayout from '../../layouts/IssuesLayout/IssuesLayout';
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import NotFoundLayout from '../../layouts/NotFoundLayout/NotFoundLayout';
import {
  ROUTE_HOME,
  ROUTE_ISSUES,
  ROUTE_LOGIN,
} from '../../constants/routes';
import './Panels.css';

type Props = {
  history: Object,
  loggedin: boolean,
  location: Object,
  match: Object,
};


/**
* Panels containing the main app content.
*/
export class Panels extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="Panels">
        {this.props.loggedin ? (
          <Switch>
            <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
            <Route exact={true} path={ROUTE_LOGIN} component={LoginLayout} />
            <Route exact={true} path={ROUTE_ISSUES} component={IssuesLayout} />
            <Route component={NotFoundLayout} />
          </Switch>
        ) : (
          <Switch>
            <Route exact={true} path={ROUTE_LOGIN} component={LoginLayout} />
            <Redirect to={ROUTE_LOGIN} />
          </Switch>
        )}
      </div>
    )
  }
}


export default withRouter(Panels);
