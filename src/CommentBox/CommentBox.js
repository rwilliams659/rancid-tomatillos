import React from 'react'
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

export default CommentBox