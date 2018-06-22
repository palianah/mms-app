// @flow

import React, { Component } from 'react';
import IssueList from '../../components/IssueList/IssueList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './IssuesLayout.css';

type Props = {
};


/**
* Issues Layout for dislaying the list of issues.
*/
export class IssuesLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
  }

  render() {
    return (
      <div className="IssuesLayout">
        <SearchBar />
        <IssueList />
      </div>
    )
  }
}


export default IssuesLayout;