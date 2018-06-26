// @flow

import React, { Component } from 'react';
import Translation from '../../Translation/Translation';
import './IssueListCount.css';

type Props = {
  matchCount: number,
  repoName: string,
  repoOwner: string,
  totalCount: number,
};


/**
* Text displaying the count of matching issues.
*/
export class IssueListCount extends Component<Props> {
  props: Props;

  render() {
    return (
      <p className="IssueListCount">
        <strong>{this.props.matchCount} / {this.props.totalCount}</strong> 
        <Translation name="Match" ns="IssuesLayout" />
        <strong>{this.props.repoOwner}/{this.props.repoName}</strong>
      </p>
    )
  }
}


export default IssueListCount;