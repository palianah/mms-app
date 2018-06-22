// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ROUTE_ISSUES, ROUTE_LOGIN } from '../../constants/routes';
import './HomeLayout.css';

type Props = {
  token: string,
  history: Object,
  location: Object,
  match: Object,
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
    if (this.props.token !== '') {
      this.props.history.push(ROUTE_ISSUES);
    } else {
      this.props.history.push(ROUTE_LOGIN);
    }
  }

  render() {
    return <section className="HomeLayout" />
  }
}

const mapStateToProps = (state: Object) => (
  {
    token: state.token,
  }
);


export default connect(mapStateToProps)(HomeLayout);