import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Movies from './Movies'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <main>
          <Movies />
        </main>
      </div>
    )
  }
}

export default App;
