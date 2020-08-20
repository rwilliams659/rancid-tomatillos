import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [ ],
      error: '',
      view: 'homepage',
      userId: null
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(movies => this.setState({movies: movies.movies}))
      .catch(error => {
        console.log(error);
        this.setState({error: 'Oops! Something went wrong!'})
      })
  }

  render() {
    return (
      <div className='App'>
        <Header showLogin={this.showLogin} />
        {this.state.view === 'homepage' && 
          <>
            <main>
              {this.state.error && 
              <h3 className='error-msg'>{this.state.error}</h3>
              }
              <Movies movies={this.state.movies} />
            </main>
          </> 
        }

        {this.state.view === 'login' && 
          <Login 
            updateUserId={this.updateUserId} 
            error={this.state.error} 
            updateError={this.updateError}
          />
        }
      </div>
    )
  }

  showLogin = () => {
    this.setState({view: 'login'})
  }

  updateUserId = (id) => {
    this.setState({userId: id})
  }

  updateError = (errorMessage) => {
    this.setState({error: errorMessage})
  }

}

export default App;
