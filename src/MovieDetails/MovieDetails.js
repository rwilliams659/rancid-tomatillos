import React, { Component } from 'react'
import './MovieDetails.css'
import { deleteRating, postNewRating } from '../apiCalls'

class MovieDetails extends Component {
  constructor(props) {
    super(props)
    console.log('currentMovieRating', this.props.currentMovieRatingInfo)
    this.state = {
      formValue: null,
    }
  }

  handleFormSelection = (event) => {
    this.setState({formValue: event.target.value})
  }

  addRating = (event) => {
    event.preventDefault();
    postNewRating(this.props.userId, this.props.currentMovie.id, this.state.formValue)
    .then(response => {
      console.log(response.status)
      this.props.updateUserRatings()
    })
    .catch(error => console.log(error))
  }

  handlingRatingDeletion = event => {
    event.preventDefault();
    deleteRating(this.props.userId, this.props.currentMovieRatingInfo.id)
      .then(response => {
        console.log(response.status);
        this.props.updateUserRatings();
      })
      .catch(error => console.log(error));
  }

  render() {
    // console.log('current rating', this.props.currentMovieRatingInfo);
    return (
      <section className='MovieDetails'>
        <section className='movie-poster-section'>
          <img src={this.props.poster} alt={this.props.title} className='movie-details-img'/>
        </section>

        <section className='movie-info'>
          <h2>{this.props.title}</h2>
          <h3>Release date: {this.props.releaseDate}</h3>
          <h3>Average rating: {this.props.averageRating}</h3>

            {this.props.loggedIn && this.props.currentMovieRatingInfo && (
              <>
                <h3>Your rating: {this.props.currentMovieRatingInfo.rating}</h3>
                <button id={this.props.currentMovieRatingInfo.id} onClick={this.handlingRatingDeletion}>Delete rating</button>
               </>
            )} 
          
            {this.props.loggedIn && !this.props.currentMovieRatingInfo && (
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