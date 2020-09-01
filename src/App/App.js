import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import MovieDetails from '../MovieDetails/MovieDetails';
import { fetchUserRatings, getMovies, postFavoriteMovie, getFavoriteMovies } from '../apiCalls';
import { Route, Switch } from 'react-router-dom';

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
      favorites: [],
    }
  }

  componentDidMount() {
    getMovies()
      .then(movies => this.setState({movies: movies.movies}))
      .catch(error => {
        console.warn('Error loading movies');
        this.setState({error: 'Oops! Something went wrong!'});
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
        <Switch>
          <Route exact path='/' render={() => 
            <Movies 
              error={this.state.error}
              movies={this.state.movies} 
              loggedIn={this.state.loggedIn}
              userRatings={this.state.userRatings}
              analyzeMovieClick={this.analyzeMovieClick}
              favorites={this.state.favorites}
              home={true}
            /> 
          }/>
          <Route exact path='/favorites' render={() =>
            <Movies
              error={this.state.error}
              movies={this.state.movies.filter(movie => this.state.favorites.includes(movie.id))}
              loggedIn={this.state.loggedIn}
              userRatings={this.state.userRatings}
              analyzeMovieClick={this.analyzeMovieClick}
              favorites={this.state.favorites}
              home={false}
            />
          }/>
          <Route exact path='/login' render={() => 
            <Login 
              updateUserId={this.updateUserId}
              updateLoginStatus={this.updateLoginStatus} 
              loggedIn={this.state.loggedIn}
              getUserRatings={this.getUserRatings}
              setFavoriteMovies={this.setFavoriteMovies}
            />
          }/>
          <Route exact path='/movies/:id' render={({ match }) => {
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
                  favorites={this.state.favorites}
                  toggleFavorite={this.toggleFavorite}
                />
              )
            }}
          />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </div>
    )
  }

  updateUserId = (id) => {
    this.setState({userId: id});
  }

  updateLoginStatus = (status) => {
    this.setState({loggedIn: status});
  }

  analyzeMovieClick = (event) => {
    if (event.target.classList.contains('heart')) {
      this.toggleFavorite(event);
    } else {
      this.updateCurrentMovie(event); 
    }
  }

  toggleFavorite = event => {
    const movieId = event.target.id.slice(5); 
    postFavoriteMovie(movieId)
      .then(response => {
        console.log(response);
        this.setFavoriteMovies();
      })
      .catch(error => {
        console.log(error);
      })
  }

  setFavoriteMovies = () => {
    getFavoriteMovies()
      .then(movies => {
        console.log(movies);
        this.setState({favorites: movies});
      }) 
      .catch(error => {
        console.log(error);
      })
  }

  updateCurrentMovie = (event) => {
    const movieId = parseInt(event.target.id) || parseInt(event.target.parentNode.id);
    const newMovie = this.state.movies.find(movie => movie.id === movieId);
    if (newMovie) {
      this.setState({ currentMovie: newMovie }, () => {
        if (this.state.userRatings.length > 0) {
          this.findCurrentMovieRating();
        }
      });
    }  
  }

  findCurrentMovieRating = () => {
     let currentRatingInfo = this.state.userRatings.find(rating => rating.movie_id === this.state.currentMovie.id);
    if (currentRatingInfo) {
      this.setState({currentMovieRatingInfo: currentRatingInfo});
    } else {
      this.setState({currentMovieRatingInfo: null}); 
    }
  } 

  updateUserRatings = () => {
    fetchUserRatings(this.state.userId) 
      .then(ratings => {
        this.setState({ userRatings: ratings.ratings }, () => {
          this.findCurrentMovieRating();
        })
      })
      .catch(error => console.log(error));
  }

  getUserRatings = () => {
    fetchUserRatings(this.state.userId) 
      .then(ratings => { 
        this.setState({ userRatings: ratings.ratings }); 
      })
      .catch(error => console.log(error));
  }
}

export default App
