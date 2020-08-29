import { React, Component } from 'react'


class CommentForm extends Component {
  constructor() {
    super()
    this.state = {
      author: '',
      comment: '',
    }
  }

  render() {
    return (
      <form className='CommentForm'>
        <h3> Add comment: </h3>
        <input type='text' placeholder='Your name' />
        <input type='text' placeholder='Comments..' />
        <input type='submit' value='Post' onSubmit={this.handleSubmit}/>
      </form>
    );
  }
}

export default CommentForm