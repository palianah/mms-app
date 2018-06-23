// @flow

import React, { Component } from 'react';
import InfoMsg from '../InfoMsg/InfoMsg';
import { text } from '../../components/Translation/Translation';
import './IssueList.css';

type Props = {
  issues: Array<any>,
};


/**
* IssueList Component to display a list of issues from the repo.
*/
export class IssueList extends Component<Props> {
  static defaultProps = {
    issues: [],
   };

  props: Props;

  render() {
    return (
      <div className="IssueList">
        <InfoMsg msg={text('Empty', 'IssueList')} />
      </div>
    )
  }
}


export default IssueList;