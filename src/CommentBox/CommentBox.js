import React from 'react'
import PropTypes from 'prop-types'
import './CommentBox.css'

const CommentBox = ({ comment, author }) => {
  return (
    <section className='CommentBox' aria-label='user comment'>
      <ul>
        <li>{comment}</li>
        <li>- - {author}</li>
      </ul>
    </section>

  )
}

CommentBox.propTypes = {
  comment: PropTypes.string,
  author: PropTypes.string
}

export default CommentBox