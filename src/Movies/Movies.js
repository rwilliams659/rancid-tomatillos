import React from 'react'
import Movie from '../Movie/Movie'
import '../Movies/Movies.css'

const Movies = ({movies}) => {
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
    <section aria-label='all-movies' className='Movies'>
      {movieList}
    </section>
  )
}

export default Movies