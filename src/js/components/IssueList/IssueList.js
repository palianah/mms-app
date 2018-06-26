// @flow

import * as React from 'react';
import InfoMsg from '../InfoMsg/InfoMsg';
import IssueListIssue from './Issue/IssueListIssue';
import Button from '../ui/Button/Button'
import Translation, { text } from '../../components/Translation/Translation';
import type { IssueType } from '../../types/issue';
import './IssueList.css';

type Props = {
  hasNextPage: boolean,
  history: Object,
  issueCount: number, // Matching count
  issues: Array<IssueType>,
  makeRequest: Function,
  online: boolean,
};


/**
* IssueList Component to display a list of issues from the repo.
*/
export class IssueList extends React.Component<Props> {
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
    return (
      <InfoMsg msg={text('Empty', 'IssueList')}>
        <p><Translation name="MaybeOffine" ns="IssueList" /></p>
      </InfoMsg>
    )
  }

  render() {
    const {
      hasNextPage,
      history,
      issueCount,
      issues,
      makeRequest,
      online,
    } = this.props;

    return (
      <div className="IssueList">
        {issueCount < 1 ? (
          this.renderEmpty()
        ) : (
          <React.Fragment>
            <ul className="IssueList__List">
              {issues.map((issue: IssueType) => (
                <IssueListIssue key={issue.id} issue={issue} history={history} online={online} />
              ))}
            </ul>
            {!online && (
              <p className="IssueList__offlineinfo"><Translation name="OfflineInfo" ns="IssueList"/></p>
            )}
            <div className="IssueList__paging" data-visible={online && hasNextPage}>
              <Button onClick={makeRequest} title={text('LoadMore', 'IssueList')}>
                  <Translation name="LoadMore" ns="IssueList"/>
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}


export default IssueList;