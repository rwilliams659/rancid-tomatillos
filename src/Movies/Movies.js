import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../Movie/Movie'
import '../Movies/Movies.css'
import { Link, Route } from 'react-router-dom'

const Movies = ({ error, movies, loggedIn, userRatings, analyzeMovieClick, favorites}) => {
    const movieList = movies.map(movie => {
    const matchingRating = userRatings.find(rating => rating.movie_id === movie.id)
    return (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none'}}>
          <Movie  
            id={movie.id}
            title={movie.title}
            averageRating={movie.average_rating}
            backdropPath={movie.backdrop_path}
            favorites={favorites}
            loggedIn={loggedIn}
            rating={matchingRating || null}
          />
        </Link>
      </li>
    )
  })
 
  return (
    <>
    <Route exact path='/' render={() =>  
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
    } />
    <Route exact path='/favorites' render={() =>
      <main>
        {movies.length === 0 && 
          <h3 className='error-msg'>You have not added any movies to your favorites yet. Please visit the home page to add some favorites!</h3>
        }
        {movies.length > 0 &&
          <h2 className='all-movies-title'>Your  Favorite Movies</h2>
        }
        <section aria-label='all-movies' className='Movies' onClick={(event) => { analyzeMovieClick(event) }}>
          {movieList}
        </section>
      </main>
    } />
    </>
  )
}

Movies.propTypes = {
  error: PropTypes.string,
  movies: PropTypes.array,
  loggedIn: PropTypes.bool,
  userRatings: PropTypes.array,
  analyzeMovieClick: PropTypes.func,
  favorites: PropTypes.array
}

export default Movies 