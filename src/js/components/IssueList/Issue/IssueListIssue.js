// @flow

import React, { Component } from 'react';
import Avatar from '../../Avatar/Avatar';
import { text } from '../../Translation/Translation';
import Icon from '../../Icon/Icon';
import type { IssueType } from '../../../types/issue';
import { ICON_COMMENT, ICON_PARTICIPANTS } from '../../../constants/icons';
import { ROUTE_ISSUE } from '../../../constants/routes';
import './IssueListIssue.css';

type Props = {
  history: Object,
  issue: IssueType,
  online: boolean,
};


/**
* An issue in the issue list.
*/
export class IssueListIssue extends Component<Props> {
  props: Props;
  handleClick: Function;

  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (id: string) => (event: SyntheticInputEvent<HTMLInputElement>) => { 
    this.props.history.push(ROUTE_ISSUE.replace(':issueId', id));
  }

  render() {
    const {
      authorAvatarUrl,
      authorName,
      authorUrl,
      commentCount,
      id,
      participantCount,
      title,
    } = this.props.issue;

    return (
      <li className="IssueListIssue" onClick={this.handleClick(id)}>
        <a 
          className="IssueListIssue__avatar"
          href={authorUrl}
          target="_blank"
          title={text('ViewProfile', 'IssueListIssue', { NAME: authorName })}
          onClick={(event) => {event.stopPropagation()}}
        >
          <Avatar src={authorAvatarUrl} online={this.props.online} />
        </a>
        <span className="IssueListIssue__title">{title}</span>
        <span className="IssueListIssue__commentcount" title={text('Count', 'IssueListIssue', { COUNT: commentCount })}>
          <Icon type={ICON_COMMENT} /> {commentCount}
        </span>
        <span className="IssueListIssue__participantcount" title={text('ParticipantCount', 'IssueListIssue', { COUNT: participantCount })}>
          <Icon type={ICON_PARTICIPANTS} /> {participantCount}
        </span>
      </li>
    )
  }
}


export default IssueListIssue;