import React, { Component } from 'react'
import './CommentContainer.css'
import { postComment, getComments } from '../apiCalls'
import Comments from '../Comments/Comments'

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
    .catch(error=> {
      console.warn('Error loading comments');
      this.setState({ error: 'Oops! Something went wrong loading the comments!' })
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
        <h3 className='commentsHeader'> Comments </h3>
        {this.props.loggedIn &&
        <form className='CommentForm' onChange={this.handleCommentSubmission}>
          <h4> Add comment: </h4>
          <input className='nameInputArea'name='author' type='text' maxlength='50' placeholder='Your name/alias' />
          <input className='commentInputArea' name='comment' type='text' maxlength='300' placeholder='Write your comment here.. (300 max characters)' />
          <input type='submit' value='Post' onClick={this.addComment} />
        </form>
        }
        {!this.state.allComments.length &&
          <div>
            <p className='noComments'>No comments to display</p>
          </div>
        }
        {(this.state.allComments.length > 0) &&
          <Comments comments={this.state.allComments} />
        }
        {this.state.error &&
          <h3 className='errorMsg'>{this.state.error}</h3>
        }
      </section >
    );
  }
}

export default CommentContainer
