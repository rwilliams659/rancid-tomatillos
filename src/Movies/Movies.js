import React from 'react'
import Movie from '../Movie/Movie'

const Movies = ({movies}) => {
  const movieList = movies.map(movie => <Movie key={movie.id} movie={movie} />)
  return (
    <section className='Movies'>
      {movieList}
    </section>
  )
}

export default Movies