import React, { Component } from 'react'
import './CommentContainer.css'
// import CommentForm from '../CommentForm/CommentForm'
import { postComment, getComments } from '../apiCalls'
import Comments from '../Comments/Comments'
import { Link } from 'react-router-dom'


class CommentContainer extends Component {
  constructor({loggedIn, movieId}) {
    super(loggedIn, movieId)
    this.state = {
      author: '',
      comment: '',
      error: '',
      allComments: []
    }
  }

  componentDidMount() {
    getComments(this.props.movieId)
      .then(comments => this.setState({ allComments: comments.comments }))
      .catch(error => {
        console.warn('Error loading comments');
        this.setState({ error: 'Oops! Something went wrong!' })
      })
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
      <section className='CommentContainer'>
        {(this.state.allComments.length < 1) &&
        <p className='no-comments'>No comments to display</p>
        }
        <Comments allComments={this.allComments} />
        {this.props.loggedIn &&
        <form className='CommentForm' onChange={this.handleCommentSubmission}>
          <h3> Add comment to movie: </h3>
          <input name='author' type='text' placeholder='Your name' />
          <input name='comment' type='text' placeholder='Comments..' />
          <input type='submit' value='Post' onClick={this.addComment} />
        </form>
        }
      </section >
    );
  }
}

export default CommentContainer
