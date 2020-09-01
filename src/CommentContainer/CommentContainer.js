import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentContainer.css';
import { postComment, getComments } from '../apiCalls';
import Comments from '../Comments/Comments';

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
    .catch(error => {
      console.warn('Error loading comments');
      this.setState({ error: 'Oops! Something went wrong loading the comments!' });
    })
  }

  componentDidMount() {
    this.loadCommentsFromServer(this.props.movieId);
  }

  addComment = () => {
    postComment(this.props.movieId, this.state.author, this.state.comment)
      .then(response => {
        console.log(response);
        this.loadCommentsFromServer(this.props.movieId);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Sorry, your comment could not be added.' });
      })
    this.resetFormValues();
  }

  validateComment = (event) => {
    event.preventDefault();
    if (!this.state.author || !this.state.comment) {
      this.setState({ error: 'Please add required field' });
    } else {
      this.addComment();
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  resetFormValues = () => {
    this.setState({
      author: '',
      comment: ''
    });
  }

  render() {
    return (
      <section className='CommentContainer' aria-label='Movie comment area'>
        <h3 className='commentsHeader'> Comments </h3>
        {this.props.loggedIn &&
          <form className='CommentForm'>
            <h4> Add comment: </h4>
            <input 
            className='nameInputArea' 
            name='author' type='text' 
            maxLength='50' placeholder='Your name/alias' 
            value={this.state.author} 
            onChange={this.handleChange}
            />
            <textarea 
            rows='5' 
            name='comment' 
            type='text' 
            maxLength='300' 
            placeholder='Write your comment here.. (300 max characters)' 
            value={this.state.comment} 
            onChange={this.handleChange}/>
            <input className='postBtn' 
            type='submit' 
            value='Post' 
            onClick={this.validateComment} 
            />
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
    )
  }
}

CommentContainer.propTypes = {
  loggedIn: PropTypes.bool,
  movieId: PropTypes.number
}

export default CommentContainer
