import React from 'react'
import './Movie.css'

const Movie = ({movie}) => {
  return (
    <section className='Movie' style={{ backgroundImage: `url(${movie.backdrop_path})`}}>
      <p className="movie-rating">{movie.average_rating} / 10</p>
      <h3 className='movie-title'>{movie.title}</h3>
    </section>
  )
}

export default Movie