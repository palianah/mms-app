// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import IssueList from '../../components/IssueList/IssueList';
import IssueListCount from '../../components/IssueList/Count/IssueListCount';
import SearchBar from '../../components/SearchBar/SearchBar';
import InfoMsg from '../../components/InfoMsg/InfoMsg';
import Button from '../../components/ui/Button/Button';
import { ICON_BUSY, ICON_ERROR } from '../../constants/icons';
import type { DispatchType } from '../../types/functions';
import type { IssuesType } from '../../types/issues';
import type { IssueDataType } from '../../types/issueData';
import * as issueActions from '../../actions/issueActions';
import gqlQuery from '../../gql/query';
import Translation, { text } from '../../components/Translation/Translation';
import { getQueryItemKey } from '../../storage/appStorage';
import './IssuesLayout.css';

type Props = {
  fetchIssues: Function,
  history: Object,
  issueData: IssueDataType,
  issues: IssuesType,
  location: Object,
  match: Object,
  online: boolean,
  repoName: string,
  repoOwner: string,
  token: string,
};


/**
* Issues Layout for dislaying the list of issues.
*/
export class IssuesLayout extends React.Component<Props> {
  props: Props;
  makeRequest: Function;

  constructor(props: Props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    this.makeRequest();
  }

  componentDidUpdate(prevProps: Props) {
    const curIssues = this.props.issues
    const prevIssues = prevProps.issues

    if (this.props.issues.fetching !== true) {
      if (curIssues.sort !== prevIssues.sort || curIssues.term !== prevIssues.term) {
        this.makeRequest();
      }
    }
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
      hasNextPage: issues.hasNextPage,
      endCursor: issues.endCursor,
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
        {this.props.issues.errorMsg.map((item: string | Object) => {
          if (typeof item === 'string') {
            return <p key={this.getErrorKey(item)}>{item}</p>
          } else {
            return <p key={this.getErrorKey(item.message)}>{item.message}</p>
          }
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
    return (
      <InfoMsg icon={ICON_BUSY} msg={text('Fetching', 'IssuesLayout')}>
        <p>
          <Translation name="Fetching_Repo" ns="IssuesLayout" /> <strong>{this.props.repoOwner}/{this.props.repoName}</strong>
          <br />
          <Translation name="Fetching_Sort" ns="IssuesLayout" /> <strong>{this.props.issues.sortField}/{this.props.issues.sort}</strong>
          <br />
          <Translation name="Fetching_Term" ns="IssuesLayout" /> <strong>{this.props.issues.term }</strong>
        </p>
      </InfoMsg>
    )
  }

  renderIssuesList() {
    const listIssues = {...this.props.issues, endCursor: '' };
    const cacheKey = getQueryItemKey(listIssues);
    const matchCount = (this.props.issueData[cacheKey]) ? this.props.issueData[cacheKey].length : 0;
    
    return (
      <React.Fragment>
        {this.props.issues.totalCount > 0 && (
          <IssueListCount matchCount={matchCount} repoName={this.props.repoName} repoOwner={this.props.repoOwner} totalCount={this.props.issues.totalCount} />
        )}
        <IssueList 
          hasNextPage={this.props.issues.hasNextPage} 
          history={this.props.history} 
          issueCount={matchCount} 
          issues={this.props.issueData[cacheKey] ? this.props.issueData[cacheKey] : []}
          makeRequest={this.makeRequest} 
          online={this.props.online}
        />
      </React.Fragment>
    )
  }

  render() {
    const { fetching, error } = this.props.issues;

    return (
      <section className="IssuesLayout" data-error={error}>
        <SearchBar fetching={fetching} />
        {this.renderIssuesList()}
        {fetching && this.renderFetching()}
        {error && this.renderError()}
      </section>
    )
  }
}


const mapStateToProps = (state: Object) => (
  {
    issueData: state.issueData,
    issues: state.issues,
    online: state.online,
    repoName: state.repo.name,
    repoOwner: state.repo.owner,
    token: state.user.token,
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