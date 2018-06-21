import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Translation from '../Translation/Translation';
import Panels from '../Panels/Panels';
import Header from '../Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
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
  }
);


export default connect(mapStateToProps)(App);
