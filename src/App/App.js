import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import MovieDetails from '../MovieDetails/MovieDetails'
import { fetchUserRatings } from '../apiCalls'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [ ],
      error: '',
      view: 'homepage',
      userId: null,
      loggedIn: false, 
      currentMovie: null,
      currentMovieRating: null,
      userRatings: [],
      // currentMovieRatingId: null
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
              loggedIn={this.state.loggedIn}
              userRatings={this.state.userRatings}
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
            getUserRatings={this.getUserRatings}
          />
        }

        {this.state.view === 'movie-details' &&
          <MovieDetails 
            poster={this.state.currentMovie.poster_path}
            title={this.state.currentMovie.title}
            releaseDate={this.state.currentMovie.release_date}
            averageRating={this.state.currentMovie.average_rating}
            userRatings={this.state.userRatings}
            currentMovie={this.state.currentMovie}
            currentMovieRating={this.state.currentMovieRating}
            loggedIn={this.state.loggedIn}
            userId={this.state.userId}
            updateUserRatings={this.updateUserRatings}
            // currentMovieRatingId={this.currentMovieRatingId}
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
    const movieId = parseInt(event.target.id) || parseInt(event.target.parentNode.id); 
    const newMovie = this.state.movies.find(movie => movie.id === movieId);
    this.setState({currentMovie: newMovie}, () => {
      if (this.state.userRatings.length > 0) {
        this.findCurrentMovieRating()
      }
    });
    this.changeView('movie-details');
  }

  findCurrentMovieRating = () => {
    let currentRating = this.state.userRatings.find(rating => rating.movie_id === this.state.currentMovie.id);
    const currentRatingId = currentRating.id
    if (currentRating) {
      this.setState({currentMovieRating: currentRating.rating})
      // this.setState({ currentMovieRating: currentRating.rating, currentMovieRatingId: currentRatingId})
    //THEORY: re-render is happening before setState has completed so we are passing in null 
    }
  }

  // THESE TWO FETCH METHODS WILL BE REFACTORED WHEN WE HAVE A SEPARATE API FETCH FILE:
  updateUserRatings = () => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.state.userId}/ratings`)
      .then(response => response.json())
      .then(ratings => {
        this.setState({ userRatings: ratings.ratings })
      })
      .catch(error => console.log(error));
  }

  getUserRatings = () => {
    fetchUserRatings(this.state.userId) 
      .then(ratings => { 
        this.setState({ userRatings: ratings.ratings }) 
        this.updateLoginStatus(true)
        this.changeView('homepage')
      })
      .catch(error => console.log(error));
  }

}

export default App;
