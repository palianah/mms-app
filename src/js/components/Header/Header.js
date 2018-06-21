// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderTitle from './Title/HeaderTitle';
import HeaderRepo from './Repo/HeaderRepo';
import {
  ROUTE_HOME,
} from '../../constants/routes';
import './Header.css';

type Props = {
  repoName: string,
};


/**
* App Header.
*/
export class Header extends Component<Props> {
  props: Props;

  render() {
    return (
      <header className="Header" id="header">
        <p className="Header__sitetitle">
          <HeaderTitle link={ROUTE_HOME}><HeaderTitle /></HeaderTitle>
          <HeaderRepo repoName={this.props.repoName} />
        </p>
      </header>
    )
  }
}


export default Header;
