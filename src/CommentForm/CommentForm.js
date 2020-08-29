import React, { Component } from 'react'
import { postComment } from '../apiCalls'


class CommentForm extends Component {
  constructor({ movieId }) {
    super(movieId)
    this.state = {
      author: '',
      comment: '',
      error: ''
    }
  }

  addComment = () => {
    postComment(this.props.movieId, this.state.author, this.state.comment)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error);
      this.setState({ error: 'Sorry, your comment could not be added.' })
    })
  }


  handleCommentSubmission = (event) => {
    console.log('movieID:', this.props.movieId)
    const nameOfInput = event.target.name
    const valueOfInput = event.target.value
    this.setState({ [nameOfInput]: valueOfInput })
  }

  render() {
    return (
      <form className='CommentForm' onChange={this.handleCommentSubmission}>
        <h3> Add comment to movie: </h3>
        <input name='author' type='text' placeholder='Your name' />
        <input name='comment' type='text' placeholder='Comments..' />
        <input type='submit' value='Post' onClick={this.addComment} />
      </form>
    );
  }
}

export default CommentForm