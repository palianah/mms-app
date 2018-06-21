// @flow

import React, { Component } from 'react';
import './HeaderRepo.css';

type Props = {
  repo: string,
};


/**
* Current repo name.
*/
export class HeaderRepo extends Component<Props> {
  static defaultProps = {
    repo: 'React',
   };

  props: Props;

  render() {
    return (
      <span className="HeaderRepo">{this.props.repo}</span>
    )
  }
}


export default HeaderRepo;
