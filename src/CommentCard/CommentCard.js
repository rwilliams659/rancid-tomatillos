import React from 'react'
import PropTypes from 'prop-types'
import './CommentCard.css'

const CommentCard = ({ comment, author }) => {
  return (
    <section className='CommentCard' aria-label='user comment'>
      <ul>
        <li>{comment}</li>
        <li>- {author}</li>
      </ul>
    </section>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.string,
  author: PropTypes.string
}

export default CommentCard