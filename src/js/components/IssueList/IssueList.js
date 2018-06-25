// @flow

import React, { Component } from 'react';
import InfoMsg from '../InfoMsg/InfoMsg';
import IssueListIssue from './Issue/IssueListIssue';
import { text } from '../../components/Translation/Translation';
import type { IssueType } from '../../types/issue';
import './IssueList.css';

type Props = {
  history: Object,
  issueCount: number,
  issues: Array<IssueType>,
};


/**
* IssueList Component to display a list of issues from the repo.
*/
export class IssueList extends Component<Props> {
  static defaultProps = {
    issues: [],
   };
  props: Props;
  renderEmpty: Function;

  constructor(props: Props) {
    super(props);
    this.renderEmpty = this.renderEmpty.bind(this);
  }

  renderEmpty() {
    return <InfoMsg msg={text('Empty', 'IssueList')} />
  }

  render() {
    return (
      <div className="IssueList">
        {this.props.issueCount < 1 ? (
          this.renderEmpty()
        ) : (
          <ul className="IssueList__List">
            {this.props.issues.map((issue: IssueType) => <IssueListIssue key={issue.id} issue={issue} history={this.props.history} />)}
          </ul>
        )}
      </div>
    )
  }
}


export default IssueList;