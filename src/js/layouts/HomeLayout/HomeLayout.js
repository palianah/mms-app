// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import setTitle from '../../utils/title';
import './HomeLayout.css';

type Props = {
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle('');
  }

  render() {
    return (
      <div className="HomeLayout">
        The home layout
      </div>
    )
  }
}


export default HomeLayout;