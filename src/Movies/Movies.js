import React from 'react'
import Movie from '../Movie/Movie'
import '../Movies/Movies.css'

const Movies = ({movies, updateCurrentMovie}) => {
  const movieList = movies.map(movie => {
    return <Movie 
    id={movie.id}
    title={movie.title}
    releaseDate={movie.release_date}
    averageRating={movie.average_rating}
    backdropPath={movie.backdrop_path}
    posterPath={movie.poster_path} 
    key={movie.id} 
    />
  })

  return (
    //ADD H2 HERE 
    <section aria-label='all-movies' className='Movies' onClick={(event) => {updateCurrentMovie(event)}}>
      {movieList}
    </section>
  )
}

export default Movies 