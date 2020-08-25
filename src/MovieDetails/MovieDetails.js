import React, { Component } from 'react'
import './MovieDetails.css'
import { deleteRating } from '../apiCalls'

class MovieDetails extends Component {
  constructor(props) {
    super(props)
    console.log('currentMovieRating', this.props.currentMovieRating)
    this.state = {
      formValue: null,
    }
  }

  handleFormSelection = (event) => {
    this.setState({formValue: event.target.value})
  }

  addRating = (event) => {
    event.preventDefault();
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.userId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          movie_id: this.props.currentMovie.id, 
          rating: parseInt(this.state.formValue) 
        }
      )
    })
    .then(response => {
      console.log(response.status)
      this.props.updateUserRatings()
    })
    .catch(error => console.log(error))
  }

  handingRatingDeletion = event => {
    event.preventDefault();
    deleteRating(this.props.userId, this.props.currentMovieRatingId)
      .then(response => console.log(response.status))
      .catch(error => console.log(error))
  }

  render() {
    // console.log('current rating', this.props.currentMovieRating);
    // console.log('current movie rating id', this.props.currentMovieRatingId);
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
                <button onClick={this.handingRatingDeletion}>Delete rating</button>
               </>
            )} 
          
            {this.props.loggedIn && !this.props.currentMovieRating && (
              <form>
                <select name='rateMovieDropdown' onChange={this.handleFormSelection}>
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