// @flow

import React, { Component } from 'react';
import HeaderTitle from './Title/HeaderTitle';
import HeaderRepo from './Repo/HeaderRepo';
import HeaderLogout from './Logout/HeaderLogout';
import {
  ROUTE_HOME,
} from '../../constants/routes';
import type { DispatchType, EventHandlerType } from '../../types/functions';
import './Header.css';

type Props = {
  dispatch: DispatchType,
  loggedin: boolean,
  repoName: string,
};


/**
* App Header.
*/
export class Header extends Component<Props> {
  props: Props;
  handleLogout: EventHandlerType;

  constructor(props: Props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event: SyntheticInputEvent<HTMLInputElement>) {
    console.log('click');
  }

  render() {
    return (
      <header className="Header" id="header">
        <p className="Header__sitetitle">
          <HeaderTitle link={ROUTE_HOME}><HeaderTitle /></HeaderTitle>
          <HeaderRepo repoName={this.props.repoName} />
        </p>
        {this.props.loggedin && <HeaderLogout onClick={this.handleLogout} />}
      </header>
    )
  }
}


export default Header;
