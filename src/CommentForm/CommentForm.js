import React, { Component } from 'react'


class CommentForm extends Component {
  constructor() {
    super()
    this.state = {
      author: '',
      comment: '',
    }
  }

  handleCommentSubmission = (event) => {
    const nameOfInput = event.target.name
    const valueOfInput = event.target.value
    this.setState({ [nameOfInput]: valueOfInput })
  }

  render() {
    return (
      <form className='CommentForm' onChange={this.handleCommentSubmission}>
        <h3> Add comment: </h3>
        <input name='author' type='text' placeholder='Your name' />
        <input name='comment' type='text' placeholder='Comments..' />
        <input type='submit' value='Post' />
      </form>
    );
  }
}

export default CommentForm