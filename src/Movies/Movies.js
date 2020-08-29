/* eslint-disable react/jsx-key */
import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie'
import '../Movies/Movies.css'
import { Link } from 'react-router-dom'

const Movies = ({ error, movies, loggedIn, userRatings, analyzeMovieClick, favorites}) => {
  let movieList;

  if (!loggedIn) {
    movieList = movies.map(movie => {
      return <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none'}}>
          <Movie 
            id={movie.id}
            title={movie.title}
            averageRating={movie.average_rating}
            backdropPath={movie.backdrop_path}
            favorites={favorites}
            loggedIn={loggedIn}
            key={movie.id}
            />
        </Link>
    })
  } else {
    movieList = movies.map(movie => {
      const matchingRating = userRatings.find(rating => rating.movie_id === movie.id)
      return <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none'}}>
        <Movie  
          id={movie.id}
          title={movie.title}
          averageRating={movie.average_rating}
          backdropPath={movie.backdrop_path}
          favorites={favorites}
          loggedIn={loggedIn}
          rating={matchingRating}
          key={movie.id}
        />
      </Link>
    })
  }
 
  return (
    <main>
      { movies.length === 0 &&
        <h3 className='error-msg'>{error}</h3>
      }
      { movies.length > 0 &&
        <h2 className='all-movies-title'>Browse All Movies</h2>
      }
        <section aria-label='all-movies' className='Movies' onClick={(event) => { analyzeMovieClick(event)}}> 
          {movieList}
        </section>
  </main>
  )
}

Movies.propTypes = {
  error: PropTypes.string,
  movies: PropTypes.array,
  loggedIn: PropTypes.bool,
  userRatings: PropTypes.array,
  // updateCurrentMovie: PropTypes.func
  analyzeMovieClick: PropTypes.func,
  favorites: PropTypes.array
}

export default Movies 