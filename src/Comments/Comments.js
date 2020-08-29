import React, { Component } from 'react'
import CommentBox from '../CommentBox/CommentBox'
import './Comments.css'

class Comments extends Component {
  constructor({comments}) {
    super()
  }

  render() {
    let commentsList;
    commentsList = this.props.comments.map(comment => {
      return (
        <CommentBox
          comment={comment.comment}
          author={comment.author}
          key={comment.id}
        />
      )
    })
    
    return (
      <section className='Comments'>
        {commentsList}
      </section>
    )
  }
}

export default Comments