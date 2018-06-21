// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import HomeLayout from '../../layouts/HomeLayout/HomeLayout';
import NotFound from '../NotFound/NotFound';
import {
  ROUTE_HOME,
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
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(Panels);
