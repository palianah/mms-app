// @flow

import React, { Component } from 'react';
import IssueListInfo from './Info/IssueListInfo';
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
        <IssueListInfo msg={text('Empty', 'IssueList')} />
      </div>
    )
  }
}


export default IssueList;