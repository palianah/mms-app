// @flow

import React, { Component } from 'react';
import IssueList from '../../components/IssueList/IssueList';
import SearchBar from '../../components/SearchBar/SearchBar';
import './HomeLayout.css';

type Props = {
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
  }

  render() {
    return (
      <div className="HomeLayout">
        <SearchBar />
        <IssueList />
      </div>
    )
  }
}


export default HomeLayout;