import React, { Component } from 'react'
import './MovieDetails.css'

class MovieDetails extends Component {
  constructor(props) {
    super(props) 
    this.state = {
    ratedByUser: true
    //  userRating 
    }
  }

  addRating = (event) => {
    event.preventDefault();
    // POST movie rating
    // add rating to sate
  }

  render() {
    return (
      <section className='MovieDetails'>
        <section className='movie-poster-section'>
          <img src={this.props.poster} alt={this.props.title} className='movie-details-img'/>
        </section>
        <section className='movie-info'>
          <h2>{this.props.title}</h2>
          <h3>Release date: {this.props.releaseDate}</h3>
          <h3>Average rating: {this.props.averageRating}</h3>

          {/* Conditional rendering - is movie rated ? TRUE/FALSE: */}
          {this.state.ratedByUser ? (
            <>
              <h3>Your rating: {this.props.averageRating}</h3>
              <button>Delete rating</button>
           </>
          ) : (
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
              <input type='submit' value='Submit' onClick={this.addRating}/> 
            </form>
          )}
          </section>
      </section>
    )
  }
}

export default MovieDetails 