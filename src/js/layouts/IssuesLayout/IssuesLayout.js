// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import IssueList from '../../components/IssueList/IssueList';
import SearchBar from '../../components/SearchBar/SearchBar';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Button from '../../components/ui/Button/Button';
import { ICON_BUSY, ICON_ERROR } from '../../constants/icons';
import type { DispatchType } from '../../types/functions';
import type { IssuesType } from '../../types/issues';
import type { IssueType } from '../../types/issue';
import * as issueActions from '../../actions/issueActions';
import gqlQuery from '../../gql/query';
import Translation, { text } from '../../components/Translation/Translation';
import './IssuesLayout.css';

type Props = {
  fetchIssues: Function,
  history: Object,
  issueData: Array<IssueType>,
  issues: IssuesType,
  location: Object,
  match: Object,
  repoName: string,
  repoOwner: string,
  token: string,
};


/**
* Issues Layout for dislaying the list of issues.
*/
export class IssuesLayout extends Component<Props> {
  props: Props;
  makeRequest: Function;

  constructor(props: Props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    this.makeRequest();
  }

  makeRequest() {
    const {
      issues,
      repoName,
      repoOwner,
      token,
    } = this.props;

    this.props.fetchIssues(gqlQuery, {
      perPage: issues.perPage,
      repoName,
      repoOwner,
      sort: issues.sort,
      sortField: issues.sortField,
      states: issues.states,
      term: issues.term,
      token,
    }, issues);
  }

  getErrorKey(item: string) {
    return item.trim()
      .toLowerCase()
      .replace(/ /g, '_');
  }

  renderError() {
    return (
      <InfoMsg icon={ICON_ERROR} msg={text('ErrorFetching', 'IssuesLayout')}>
        {this.props.issues.errorMsg.map((item: string) => {
          return <p key={this.getErrorKey(item)}>{item}</p>
        })}
        <p className="IssuesLayout__retry" onClick={this.makeRequest}>
          <strong>
            <Button onClick={this.makeRequest} title={text('Retry', 'IssuesLayout')}>
                <Translation name="Retry" ns="IssuesLayout"/>
            </Button>
          </strong>
        </p>
      </InfoMsg>
    )
  }

  renderFetching() {
    return <InfoMsg icon={ICON_BUSY} msg={text('Fetching', 'IssuesLayout')} />
  }

  renderIssuesList() {
    return <IssueList history={this.props.history} issueCount={this.props.issues.totalCount} issues={this.props.issueData} />
  }

  render() {
    const { fetching, error } = this.props.issues;
    const ready = !fetching && !error;

    return (
      <section className="IssuesLayout" data-error={error}>
        <SearchBar />
        {ready && this.renderIssuesList()}
        {fetching && this.renderFetching()}
        {error && this.renderError()}
      </section>
    )
  }
}


const mapStateToProps = (state: Object) => (
  {
    repoOwner: state.repo.owner,
    repoName: state.repo.name,
    token: state.user.token,
    issues: state.issues,
    issueData: state.issueData,
  }
);

const mapDispatchToProps = (dispatch: DispatchType) => {
  return {
    fetchIssues: (gqlQuery: Function, config: Object, issues: IssuesType) => {
      dispatch(issueActions.fetchIssues(gqlQuery, config, issues));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(IssuesLayout);