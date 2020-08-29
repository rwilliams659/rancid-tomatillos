import React, { Component } from 'react'
import CommentBox from '../CommentBox/CommentBox'
import PropTypes from 'prop-types'
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

Comments.propTypes = {
  comments: PropTypes.array
}

export default Comments