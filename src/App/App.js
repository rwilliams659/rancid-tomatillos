import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [ ]
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(movies => this.setState({movies: movies.movies}))
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <main>
          <Movies movies={this.state.movies} />
        </main>
      </div>
    )
  }
}

export default App;
