import React from 'react'
import './Movie.css'

const Movie = ({id, title, averageRating, backdropPath, rating}) => {
  return (
    <section className='Movie' aria-label='movie' style={{ backgroundImage: `url(${backdropPath})`}} id={id}>
      <p className="movie-rating">{averageRating} / 10</p>
      <h3 className='movie-title'>{title}</h3>
      {rating &&
        <p className="user-rating">Your rating: {rating.rating} / 10</p>
      }     
    </section>
  )
}

export default Movie