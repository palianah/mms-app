import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Panels from '../Panels/Panels';
import Header from '../Header/Header';
import { text } from '../Translation/Translation';
import type { DispatchType } from '../../types/functions';
import './App.css';


type Props = {
  dispatch: DispatchType,
  loggedin: boolean,
  online: boolean,
  repoName: string,
  repoOwner: string,
}

class App extends Component<Props> {
  props: Props;

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header repoName={this.props.repoName} loggedin={this.props.loggedin} dispatch={this.props.dispatch} />
          <div className="App__content">
            <Panels loggedin={this.props.loggedin} />
          </div>
          {!this.props.online && <span className="App__offline">{text('Offline', 'App')}</span>}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: Object) => (
  {
    loggedin: state.user.loggedin,
    online: state.online,
    repoName: state.repo.name,
    repoOwner: state.repo.owner,
  }
);


export default connect(mapStateToProps)(App);
