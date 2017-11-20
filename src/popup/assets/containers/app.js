import React, { Component } from 'react';
import Header from './header';
import Stack from './stack';
import Settings from './settings';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Stack />
        <Settings />
      </div>
    );
  }
}

export default App;
