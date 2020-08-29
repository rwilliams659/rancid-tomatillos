import React from 'react'
import PropTypes from 'prop-types'
import './Movie.css'
import heartFavoriteFalse from '../images/heart-outline.png'
import heartFavoriteTrue from '../images/heart.png'

const Movie = ({id, title, averageRating, backdropPath, rating}) => {
  return (
    <section className='Movie' aria-label='movie-overview' style={{ backgroundImage: `url(${backdropPath})`}} id={id}>
      <img className = "heart" src={heartFavoriteFalse}></img>
      <p className="movie-rating">{Math.round(averageRating * 10) / 10} / 10</p>
      <h3 className='movie-title'>{title}</h3>
      {rating &&
        <p className="user-rating">Your rating: {rating.rating} / 10</p>
      }     
    </section>
  )
}

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  averageRating: PropTypes.number,
  backdropPath: PropTypes.string,
  rating: PropTypes.object
}

export default Movie