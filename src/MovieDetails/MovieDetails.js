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
        {/* Conditional rendering - is movie rated ?  */}
        {/* TRUE: */}
        <h3>Your rating: {averageRating}</h3>
        {/* Delete rating functionality */}
        {/* Conditional rendering - is movie rated ?  */}
        {/* FALSE: */}
        <form>
          <select name='rateMovieDropdown'>
            <option value=''>--Choose a rating--</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          <input type='submit' value='Submit'/> 
          {/* Add click event for submit button */}
        </form>
      </section>
    </section>
  )
}

export default MovieDetails 