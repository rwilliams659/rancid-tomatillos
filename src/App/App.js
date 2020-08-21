import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import MovieDetails from '../MovieDetails/MovieDetails'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [ ],
      error: '',
      view: 'homepage',
      userId: null,
      loggedIn: false, 
      currentMovie: null 
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
        <Header 
        changeView={this.changeView}
        loggedIn={this.state.loggedIn} 
        updateLoginStatus={this.updateLoginStatus} 
        updateUserId={this.updateUserId}
        />
        {this.state.view === 'homepage' && 
          <>
            <main>
              {this.state.error && 
              <h3 className='error-msg'>{this.state.error}</h3>
              }
              <Movies 
              movies={this.state.movies} 
              updateCurrentMovie={this.updateCurrentMovie}
              />
            </main>
          </> 
        }

        {this.state.view === 'login' && 
          <Login 
            updateUserId={this.updateUserId}
            updateLoginStatus={this.updateLoginStatus} 
            changeView={this.changeView}
            error={this.state.error} 
            updateError={this.updateError}
          />
        }

        {this.state.view === 'movie-details' &&
          <MovieDetails 
            poster={this.state.currentMovie.poster}
            title={this.state.currentMovie.title}
            releaseDate={this.state.currentMovie.releaseDate}
            averageRating={this.state.currentMovie.averageRating}
          />
        }
      </div>
    )
  }

  changeView = (newView) => {
    this.setState({view: newView})
  }

  updateUserId = (id) => {
    this.setState({userId: id})
  }

  updateLoginStatus = (status) => {
    this.setState({loggedIn: status})
  }

  updateError = (errorMessage) => {
    this.setState({error: errorMessage})
  }

  updateCurrentMovie = (event) => {
    const movieId = parseInt(event.target.parentNode.id); 
    const newMovie = this.state.movies.find(movie => movie.id === movieId);
    this.setState({currentMovie: newMovie});
    this.changeView('movie-details');
  }

}

export default App;
