import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentContainer from '../CommentContainer/CommentContainer'
import './MovieDetails.css'
import { deleteRating, postNewRating } from '../apiCalls'

class MovieDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValue: null,
      error: '',
      comments: []
    }
  }

  handleFormSelection = (event) => {
    this.setState({formValue: event.target.value})
  }

  addRating = (event) => {
    event.preventDefault();
    postNewRating(this.props.userId, this.props.currentMovie.id, this.state.formValue)
    .then(response => {
      console.log(response)
      this.props.updateUserRatings();
    })
    .catch(error => {
      console.log(error);
      this.setState({error:'Sorry, your rating could not be added.'})
    })
  }

  handlingRatingDeletion = async event => {
    event.preventDefault();
    await deleteRating(this.props.userId, this.props.currentMovieRatingInfo.id)
      .then(response => {
        console.log(response)
        this.props.updateUserRatings();
      })
      .catch(error => { 
        console.log(error);
        this.setState({ error:'Sorry, your rating could not be deleted.'})
      });
  }

  render() {
    return (
      <section className='MovieDetails'>
        <section className='movie-poster-section'>
          <img src={this.props.poster_path} alt={this.props.title} className='movie-details-img'/>
        </section>

        <section className='movie-info'>
          <h2>{this.props.title}</h2>
          <h3>Release date: {this.props.
            release_date}</h3>
          <h3>Average rating: {Math.round(this.props.average_rating * 10) / 10}</h3>

            {this.props.loggedIn && this.props.currentMovieRatingInfo && (
              <>
                <h3>Your rating: {this.props.currentMovieRatingInfo.rating}</h3>
                <button id={this.props.currentMovieRatingInfo.id} onClick={this.handlingRatingDeletion}>Delete rating</button>
               </>
            )} 
          
            {this.props.loggedIn && !this.props.currentMovieRatingInfo && (
              <form aria-label="select movie rating">
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
          {this.state.error &&
            <h3 className='error-msg'>{this.state.error}</h3>
          }
          <CommentContainer loggedIn={this.props.loggedIn}/>
        </section>
        
      </section>
    )
  }
}

MovieDetails.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  average_rating: PropTypes.number,
  release_date: PropTypes.string,
  userRatings: PropTypes.array,
  currentMovie: PropTypes.object,
  currentMovieRatingInfo: PropTypes.object,
  loggedIn: PropTypes.bool,
  userId: PropTypes.number,
  updateUserRatings: PropTypes.func,
}

export default MovieDetails 