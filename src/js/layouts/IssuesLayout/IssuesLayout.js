// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import IssueList from '../../components/IssueList/IssueList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './IssuesLayout.css';

type Props = {
  history: Object,
  location: Object,
  match: Object,
};


/**
* Issues Layout for dislaying the list of issues.
*/
export class IssuesLayout extends Component<Props> {
  props: Props;

  render() {
    return (
      <section className="IssuesLayout">
        <SearchBar />
        <IssueList />
      </section>
    )
  }
}


const mapStateToProps = (state: Object) => (
  {
    loggedin: state.user.loggedin,
  }
);


export default connect(mapStateToProps)(IssuesLayout);