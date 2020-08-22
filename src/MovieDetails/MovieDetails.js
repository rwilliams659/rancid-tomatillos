import React, { Component } from 'react'
import './MovieDetails.css'

class MovieDetails extends Component {
  constructor(props) {
    super(props) 
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

            {this.props.loggedIn && this.props.currentMovieRating && (
              <>
                <h3>Your rating: {this.props.currentMovieRating}</h3>
                <button>Delete rating</button>
               </>
            )} 
          
            {this.props.loggedIn && !this.props.currentMovieRating && (
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