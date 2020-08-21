import React from 'react'
import './MovieDetails.css'

const MovieDetails = ({poster, title, releaseDate, averageRating}) => {
  return (
    <section className='MovieDetails'>
      <section className='movie-poster-section'>
        <img src={poster} alt={title} className='movie-details-img'/>
      </section>
      <section className='movie-info'>
        <h2>{title}</h2>
        <h3>Release date: {releaseDate}</h3>
        <h3>Average rating: {averageRating}</h3>
      </section>
    </section>
  )
}

export default MovieDetails 