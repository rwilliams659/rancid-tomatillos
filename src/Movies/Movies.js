import React from 'react'
import Movie from '../Movie/Movie'
import '../Movies/Movies.css'

const Movies = ({movies, loggedIn, userRatings, updateCurrentMovie}) => {
  let movieList;

  if (!loggedIn) {
    movieList = movies.map(movie => {
        return <Movie 
        id={movie.id}
        title={movie.title}
        averageRating={movie.average_rating}
        backdropPath={movie.backdrop_path}
        key={movie.id} 
        />
    })
  } else {
    movieList = movies.map(movie => {
      const matchingRating = userRatings.find(rating => rating.movie_id === movie.id)
      return <Movie
        id={movie.id}
        title={movie.title}
        averageRating={movie.average_rating}
        backdropPath={movie.backdrop_path}
        rating={matchingRating}
        key={movie.id}
        //matchingRating.id is rating id
      />
    })
  }
 
  return (
    <div>
      <h2 className='all-movies-title'>Browse All Movies</h2>
      <section aria-label='all-movies' className='Movies' onClick={(event) => {updateCurrentMovie(event)}}>
        {movieList}
      </section>
    </div>
  )
}

export default Movies 