import React from 'react'
import CommentContainer from './CommentContainer'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { getComments } from '../apiCalls';
jest.mock('../apiCalls')

describe('CommentsContainer component', () => {

  it('if the user is not logged in, it should have the correct content when rendered', () => {

    getComments.mockResolvedValue({
      comments: [
        {
          author: 'Diana',
          comment: 'Great movie!'
        }
      ]
    })

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

  it('if the user is logged in, it should have the correct content, including a comment form, when rendered', () => {

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

  it('it should display a message if there are no comments to display', () => {

    getComments.mockResolvedValue({
      comments: []
    })

    render(
      <BrowserRouter>
        <CommentContainer
          loggedIn={false}
          movieId={17}
        />
      </BrowserRouter>
    )

    const message = screen.getByText('No comments to display')
    expect(message).toBeInTheDocument()
  })

  it('should display error message if comments couldn\'t be fetched', async () => {
    
    getComments.mockRejectedValue('Error loading comments')
    
    render(
      <BrowserRouter>
        <CommentContainer
          loggedIn={true}
          movieId={17}
        />
      </BrowserRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('Oops! Something went wrong loading the comments!'))
    expect(errorMsg).toBeInTheDocument()
  })
  
})
