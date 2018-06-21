// @flow

import React, { Component } from 'react';
import './HeaderRepo.css';

type Props = {
  repoName: string,
};


/**
* Current repo name.
*/
export class HeaderRepo extends Component<Props> {
  props: Props;

  render() {
    return (
      <span className="HeaderRepo">{this.props.repoName}</span>
    )
  }
}


export default HeaderRepo;
