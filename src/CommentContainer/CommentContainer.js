import React, { Component } from 'react'
import './CommentContainer.css'
import { postComment, getComments } from '../apiCalls'
import Comments from '../Comments/Comments'
import { Link } from 'react-router-dom'


class CommentContainer extends Component {
  constructor({loggedIn, movieId}) {
    super()
    this.state = {
      author: '',
      comment: '',
      error: '',
      allComments: []
    }
  }

  loadCommentsFromServer = (id) => {
    getComments(id)
   .then(comments => this.setState({ allComments: comments.comments }))
    .catch(error => {
      console.warn('Error loading comments');
      this.setState({ error: 'Oops! Something went wrong!' })
    })
}

  componentDidMount() {
    this.loadCommentsFromServer(this.props.movieId)
  }

  resetForm() {
    this.setState({
      author: '',
      comment: ''
    })
  } 

  addComment = (event) => {
    event.preventDefault()
    console.log('add comment')
    this.resetForm()
    postComment(this.props.movieId, this.state.author, this.state.comment)
      .then(response => {
        console.log(response)
        this.loadCommentsFromServer(this.props.movieId)
        console.log('updated comments:', this.state.comments)
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
        <h3> Comments </h3>
        {!this.state.allComments.length &&
          <div>
            <p className='no-comments'>No comments to display</p>
          </div>
        }
        {(this.state.allComments.length > 0) &&
        <Comments comments={this.state.allComments} />
        }
        {this.props.loggedIn &&
        <form className='CommentForm' onChange={this.handleCommentSubmission}>
          <h3> Add comment: </h3>
          <input name='author' type='text' placeholder='Your name' />
          <input name='comment' type='text' placeholder='Write your comment here..' />
          <input type='submit' value='Post' onClick={this.addComment} />
        </form>
        }
      </section >
    );
  }
}

export default CommentContainer
