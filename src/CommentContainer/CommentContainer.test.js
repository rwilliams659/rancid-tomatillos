import React from 'react'
import CommentContainer from './CommentContainer'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';

describe('CommentsContainer component', () => {
  it('if the user is not logged in, should have the correct content when rendered', () => {
    render(
      <BrowserRouter>
        <CommentContainer 
        loggedIn={false}
        movieId={17}
        />
      </BrowserRouter>
    )
  
    const commentsHeading = screen.getByText('Comments')
    expect(commentsHeading).toBeInTheDocument()
  })

  it('if the user is logged in, should have the correct content when rendered', () => {
    render(
      <BrowserRouter>
        <CommentContainer
          loggedIn={true}
          movieId={17}
        />
      </BrowserRouter>
    )

    const commentsHeading = screen.getByText('Comments')
    const formHeading = screen.getByText('Add comment:')
    const formButton = screen.getByText('Post')
  
    expect(commentsHeading).toBeInTheDocument()
    expect(formHeading).toBeInTheDocument()
    expect(formButton).toBeInTheDocument()
  })
})
