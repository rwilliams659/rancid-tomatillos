import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound/PageNotFound'
import MovieDetails from '../MovieDetails/MovieDetails'
import { fetchUserRatings, getMovies } from '../apiCalls'
import { Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      error: '',
      userId: null,
      loggedIn: false, 
      currentMovie: null,
      currentMovieRatingInfo: null,
      userRatings: [],
    }
  }

  componentDidMount() {
    getMovies()
      .then(movies => this.setState({movies: movies.movies}))
      .catch(error => {
        console.warn('Error loading movies');
        this.setState({error: 'Oops! Something went wrong!'})
      })
  }

  render() {
    return (
      <div className='App'>
        <Header 
        loggedIn={this.state.loggedIn} 
        updateLoginStatus={this.updateLoginStatus} 
        updateUserId={this.updateUserId}
        />
        <Route exact path='/' render={() => 
          <Movies 
            error={this.state.error}
            movies={this.state.movies} 
            loggedIn={this.state.loggedIn}
            userRatings={this.state.userRatings}
            updateCurrentMovie={this.updateCurrentMovie}
          />} />
        <Route exact path='/login' render={() => 
          <Login 
            updateUserId={this.updateUserId}
            updateLoginStatus={this.updateLoginStatus} 
            loggedIn={this.state.loggedIn}
            getUserRatings={this.getUserRatings}
        />} />
        <Route 
          path='/movies/:id'
          exact
          render={({ match }) => {
            const movieToRender = this.state.movies.find(movie => movie.id === +match.params.id)
            return (
              <MovieDetails 
                {...movieToRender}
                userRatings={this.state.userRatings}
                currentMovie={this.state.currentMovie}
                currentMovieRatingInfo={this.state.currentMovieRatingInfo}
                loggedIn={this.state.loggedIn}
                userId={this.state.userId}
                updateUserRatings={this.updateUserRatings}
              />)
          }}
        />
        {/* <Route path='*' component={PageNotFound} /> */}
      </div>
    )
  }

  updateUserId = (id) => {
    this.setState({userId: id})
  }

  updateLoginStatus = (status) => {
    this.setState({loggedIn: status})
  }

  updateCurrentMovie = (event) => {
    const movieId = parseInt(event.target.id) || parseInt(event.target.parentNode.id); 
    const newMovie = this.state.movies.find(movie => movie.id === movieId);
    this.setState({currentMovie: newMovie}, () => {
      if (this.state.userRatings.length > 0) {
        this.findCurrentMovieRating()
      }
    });
  }

  findCurrentMovieRating = () => {
     let currentRatingInfo = this.state.userRatings.find(rating => rating.movie_id === this.state.currentMovie.id);
    if (currentRatingInfo) {
      this.setState({currentMovieRatingInfo: currentRatingInfo});
    } else {
      this.setState({currentMovieRatingInfo: null}); 
    }
  } 

  // REFACTOR THE 2 BELOW WHEN TIME TO AVOID DUPLICATION
  updateUserRatings = () => {
    fetchUserRatings(this.state.userId) 
      .then(ratings => {
        this.setState({ userRatings: ratings.ratings }, () => {
          this.findCurrentMovieRating()
        })
      })
      .catch(error => console.log(error));
  }

  getUserRatings = () => {
    fetchUserRatings(this.state.userId) 
      .then(ratings => { 
        this.setState({ userRatings: ratings.ratings }) 
        this.updateLoginStatus(true) // need to move this to login
      })
      .catch(error => console.log(error));
  }

}

export default App;
