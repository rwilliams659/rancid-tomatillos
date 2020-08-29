import React from 'react'
import './CommentContainer.css'
import CommentForm from '../CommentForm/CommentForm'
import Comments from '../Comments/Comments'
import { Link } from 'react-router-dom'


const CommentContainer = ({loggedIn}) => {

  // if there are no comments. Display message
  // otherwise, map over comments and render comment boxes

  // if logged in, show form for adding a new comment

return (
  <section className='CommentContainer'>
   <p className='no-comments'>No comments to display</p>
    
      {loggedIn &&
      <div>
      <h3>Comments</h3>
      <Comments />
      <CommentForm />
    </div>
      }
    
  </section>
)}



export default CommentContainer
