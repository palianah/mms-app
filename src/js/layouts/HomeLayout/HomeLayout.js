// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IssueList from '../../components/IssueList/IssueList';
import SearchBar from '../../components/SearchBar/SearchBar';
import setTitle from '../../utils/title';
import './HomeLayout.css';

type Props = {
};


/**
* Home Layout.
*/
export class HomeLayout extends Component<Props> {
  props: Props;

  componentDidMount() {
    setTitle('');
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