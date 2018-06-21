import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Translation from '../Translation/Translation';
import Panels from '../Panels/Panels';
import Header from '../Header/Header';
import './App.css';

type Props = {
  repoName: string,
  repoOwner: string,
}

class App extends Component<Props> {
  props: Props;

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header repoName={this.props.repoName} />
          <div className="App__content">
            <Panels />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: Object) => (
  {
    repoName: state.repo.name,
    repoOwner: state.repo.owner,
  }
);


export default connect(mapStateToProps)(App);
