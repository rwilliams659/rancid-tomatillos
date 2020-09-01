import React from 'react';
import CommentContainer from './CommentContainer';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { getComments, postComment } from '../apiCalls';
jest.mock('../apiCalls');

describe('CommentsContainer component', () => {
  it('if the user is not logged in, it should have the correct content when rendered', () => {

    getComments.mockResolvedValue({
      comments: [
        {
          author: 'Diana',
          comment: 'Great movie!',
          movieId: 17,
          id: 1
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
  
    const commentsHeading = screen.getByText('Comments');
    expect(commentsHeading).toBeInTheDocument();
  })

  it('if the user is logged in, it should have the correct content when rendered', () => {

    render(
      <BrowserRouter>
        <CommentContainer
          loggedIn={true}
          movieId={17}
        />
      </BrowserRouter>
    )

    const commentsHeading = screen.getByText('Comments');
    const formHeading = screen.getByText('Add comment:');
    const formButton = screen.getByText('Post');
  
    expect(commentsHeading).toBeInTheDocument();
    expect(formHeading).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

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

    const errorMsg = await waitFor(() => screen.getByText('Oops! Something went wrong loading the comments!'));

    expect(errorMsg).toBeInTheDocument();
  });

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

    const message = screen.getByText('No comments to display');

    expect(message).toBeInTheDocument();
  });

  it('if logged in, the user should be able to add a new comment', async () => {

    getComments.mockResolvedValueOnce({
      comments: []
    })

    postComment.mockResolvedValueOnce({
        author: 'Diana',
        comment: 'Great movie!',
      })
    
    render(
      <MemoryRouter>
        <CommentContainer
          loggedIn={true}
          movieId={17}
        />
      </MemoryRouter>
    )

    getComments.mockResolvedValueOnce({
      comments: [
        {
        author: 'Diana',
        comment: 'Great movie!',
        movieId: 17,
        id: 1
        }
      ]
    })

    const authorInput = screen.getByPlaceholderText('Your name/alias');
    const commentInput = screen.getByPlaceholderText('Write your comment here.. (300 max characters)');
    const addCommentButton = screen.getByText('Post');

    fireEvent.change(authorInput, { target: { value: 'Diana' }});
    fireEvent.change(commentInput, { target: { value: 'Great movie!' }});
    
    fireEvent.click(addCommentButton);

    const newCommentAuthor = await waitFor(() => screen.getByText('- Diana'));
    const newComment = await waitFor(() => screen.getByText('Great movie!'));
    expect(newCommentAuthor).toBeInTheDocument();
    expect(newComment).toBeInTheDocument();
  });
})
