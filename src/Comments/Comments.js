import React from 'react'
import CommentBox from '../CommentBox/CommentBox'
import PropTypes from 'prop-types'
import './Comments.css'

const Comments = ({ comments }) => {
  let commentsList;
  commentsList = comments.map(comment => {
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

Comments.propTypes = {
  comments: PropTypes.array
}

export default Comments