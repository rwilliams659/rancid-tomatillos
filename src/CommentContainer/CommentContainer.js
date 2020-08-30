import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CommentContainer.css'
import { postComment, getComments } from '../apiCalls'
import Comments from '../Comments/Comments'

class CommentContainer extends Component {
  constructor(props) {
    super(props)
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

  resetFormValues = () => {
    this.setState({
      author: '',
      comment: ''
    })
  } 

  validateComment = (event) => {
    event.preventDefault()
    if (!this.state.author || !this.state.comment) {
      this.setState({ error: 'Please add required field' })
    } else {
      this.addComment()
    }
  }

  addComment = () => {
    postComment(this.props.movieId, this.state.author, this.state.comment)
      .then(response => {
        console.log(response)
        this.loadCommentsFromServer(this.props.movieId)
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Sorry, your comment could not be added.' })
      })
    this.resetFormValues()
  }

 
  handleCommentSubmission = (event) => {
    let nameOfInput = event.target.name
    let valueOfInput = event.target.value
    this.setState({ [nameOfInput]: valueOfInput }) 
  }

  render() {
    return (
      <section className='CommentContainer'>
        <h3 className='commentsHeader'> Comments </h3>
        {this.props.loggedIn &&
        <form className='CommentForm' onChange={this.handleCommentSubmission}>
          <h4> Add comment: </h4>
          <input className='nameInputArea'name='author' type='text' maxLength='50' placeholder='Your name/alias' value={this.state.author}/>
          <textarea rows='5' name='comment' type='text' maxLength='300' placeholder='Write your comment here.. (300 max characters)' value={this.state.comment}/>
          <input className='postBtn' type='submit' value='Post' onClick={this.validateComment} />
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

CommentContainer.propTypes = {
  loggedIn: PropTypes.bool,
  movieId: PropTypes.number
}

export default CommentContainer
