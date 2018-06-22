// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import IssuesLayout from '../../layouts/IssuesLayout/IssuesLayout';
import NotFound from '../NotFound/NotFound';
import {
  ROUTE_HOME,
  ROUTE_ISSUES,
} from '../../constants/routes';
import './Panels.css';

type Props = {
  history: Object,
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
        <Switch>
          <Route exact={true} path={ROUTE_HOME} component={HomeLayout} />
          <Route path={ROUTE_ISSUES} component={IssuesLayout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(Panels);
