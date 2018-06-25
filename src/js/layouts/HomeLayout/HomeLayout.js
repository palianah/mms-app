// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
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