import React from 'react'

const Movie = ({movie}) => {
  return (
    <section className='Movie'>
      <h3>{movie.title}</h3>
      <p>{movie.average_rating}</p>
    </section>
  )
}

export default Movie