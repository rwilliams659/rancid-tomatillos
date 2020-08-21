import React from 'react'
import './Movie.css'

const Movie = ({id, title, releaseDate, averageRating, backdropPath, posterPath}) => {
  return (
    <section className='Movie' aria-label='movie' style={{ backgroundImage: `url(${backdropPath})`}} id={id}>
      <p className="movie-rating">{averageRating} / 10</p>
      <h3 className='movie-title'>{title}</h3>
    </section>
  )
}

export default Movie