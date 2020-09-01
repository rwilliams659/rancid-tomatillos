import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { getMovies, checkLoginCredentials, fetchUserRatings, getFavoriteMovies, postFavoriteMovie, getComments, postNewRating, deleteRating, postComment } from '../apiCalls';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
jest.mock('../apiCalls');

describe('App Component', () => {
  it('should load a list of movie cards when the app loads', async () => {
    
    getMovies.mockResolvedValue({
      movies: [
          {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        },
        {
          id: 2,
          title: 'Dogs',
          release_date: '2020-02-20',
          average_rating: 10,
          backdrop_path: 'http://coolDogs.com',
          poster_path: 'http://coolDog-on-beach.com'
        }
      ]
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const title1 = await waitFor (() => screen.getByText('Cats'));
    const title2 = await waitFor(() => screen.getByText('Dogs'));

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  })

  it('should display an error message if movie cards fail to load', async () => 
  {
    getMovies.mockRejectedValue('Error loading movies');
    
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('Oops! Something went wrong!'));
    expect(errorMsg).toBeInTheDocument();
  })

  it('should be able to successfully log in a user', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        },
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValue({
      ratings: [
        {
          id: 1,
          user_id: 100,
          movie_id: 10,
          rating: 5,
          created_at: '2020-08-17T23:48:55.695Z',
          updated_at: '2020-08-17T23:48:55.695Z'
        },
        {
          id: 2,
          user_id: 100,
          movie_id: 20,
          rating: 10,
          created_at: '2020-09-12T23:48:55.695Z',
          updated_at: '2020-09-12T23:48:55.695Z'
        }
      ]
    })

    getFavoriteMovies.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    const submitBtn = screen.getByText('Submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument(); 

    fireEvent.change(emailInput, {target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});

    fireEvent.click(submitBtn); 

    const logOutBtn = await waitFor(() => screen.getByText('Log out'));

    expect(logOutBtn).toBeInTheDocument(); 
  });

  it('should add a new rating when a rating is submitted', async () => {
    
    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        }
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValueOnce({
      ratings: []
    })

    getFavoriteMovies.mockResolvedValueOnce([]);
      
    getComments.mockResolvedValueOnce({
      comments: []
    })

    postNewRating.mockResolvedValue({
      rating: {
        movie_id: 1,
        rating: 10,
        user_id: 1
      }
    })

    fetchUserRatings.mockResolvedValueOnce({
      ratings: [{
        movie_id: 1,
        rating: 10,
        user_id: 1,
        created_at: '2020-08-17T23:48:55.695Z',
        updated_at: '2020-08-17T23:48:55.695Z'
      }]
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCardBtn = await waitFor( () => screen.getByText('Cats'));

    fireEvent.click(movieCardBtn);

    const form = screen.getByTestId('select-one');
    const input10 = screen.getByTestId('val10');
    const ratingSubmitBtn = screen.getByText('Submit');
  
    userEvent.selectOptions(form, ['10']);

    expect(input10.selected).toBe(true);

    fireEvent.click(ratingSubmitBtn);

    const deleteRatingBtn = await waitFor( () => screen.getByText('Delete rating'));

    expect(deleteRatingBtn).toBeInTheDocument();
  });

  it('should be able to delete a rating', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        }
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: "diana@turing.io",
        id: 100,
        name: "Di"
      }
    })

    fetchUserRatings.mockResolvedValueOnce({
      ratings: [{
        movie_id: 1,
        rating: 10,
        user_id: 1,
        created_at: '2020-08-17T23:48:55.695Z',
        updated_at: '2020-08-17T23:48:55.695Z'
      }]
    })

    getFavoriteMovies.mockResolvedValueOnce([])

    getComments.mockResolvedValueOnce({
      comments: []
    })

    deleteRating.mockResolvedValue('Success')

    fetchUserRatings.mockResolvedValueOnce({
      ratings: []
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCardBtn = await waitFor(() => screen.getByText('Cats'));

    fireEvent.click(movieCardBtn);

    const deleteRatingBtn = screen.getByText('Delete rating');

    fireEvent.click(deleteRatingBtn);
    
    const form = await waitFor(() => screen.getByTestId('select-one'));

    expect(form).toBeInTheDocument();
  });

  it('should be able to add a new comment when logged in', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        },
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValueOnce({
      ratings: []
    })

    getFavoriteMovies.mockResolvedValueOnce([])

    getComments.mockResolvedValueOnce({
      comments: []
    })

    postComment.mockResolvedValueOnce({
      author: 'Diana',
      comment: 'Great movie!'
    })

    getComments.mockResolvedValueOnce({
      comments: [
        {
          author: 'Diana',
          comment: 'Great movie!',
        }
      ]
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCardBtn = await waitFor(() => screen.getByText('Cats'));

    fireEvent.click(movieCardBtn);

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

  it('should be able to favorite and un-favorite a movie on the homepage', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        },
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValue({
      ratings: []
    })

    getFavoriteMovies.mockResolvedValueOnce([])

    postFavoriteMovie.mockResolvedValueOnce(
      {
        message: 'Movie with an id of 1 was favorited'
      }
    )

    getFavoriteMovies.mockResolvedValueOnce([1])

    postFavoriteMovie.mockResolvedValueOnce(
      {
        message: 'Movie with an id of 1 was un-favorited'
      }
    )

    getFavoriteMovies.mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    const submitBtn = screen.getByText('Submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCardIcon = await waitFor(() => screen.getByAltText('not favorited'));

    fireEvent.click(movieCardIcon);

    const movieCardIconFavorited = await waitFor(() => screen.getByAltText('favorited'));

    expect(movieCardIconFavorited).toBeInTheDocument();

    fireEvent.click(movieCardIconFavorited);

    const movieCardFilledIcon = await waitFor(() => screen.getByAltText('not favorited'));

    expect(movieCardFilledIcon).toBeInTheDocument();
  });

  it('should be able to favorite and un-favorite a movie on the movie Details page', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        }
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValue({
      ratings: []
    })

    getFavoriteMovies.mockResolvedValueOnce([])

    getComments.mockResolvedValueOnce({
      comments: []
    })

    postFavoriteMovie.mockResolvedValueOnce(
      {
        message: 'Movie with an id of 1 was favorited'
      }
    )

    getFavoriteMovies.mockResolvedValueOnce([1])

    postFavoriteMovie.mockResolvedValueOnce(
      {
        message: 'Movie with an id of 1 was un-favorited'
      }
    )

    getFavoriteMovies.mockResolvedValueOnce([])

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    const submitBtn = screen.getByText('Submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCard = await waitFor(() => screen.getByText('Cats'));

    fireEvent.click(movieCard);

    const releaseDate = screen.getByText('Release date: 2020-01-20');

    expect(releaseDate).toBeInTheDocument(); 

    const movieCardIcon = screen.getByAltText('not favorited');

    fireEvent.click(movieCardIcon);

    const movieCardIconFavorited = await waitFor(() => screen.getByAltText('favorited'));

    expect(movieCardIconFavorited).toBeInTheDocument();

    fireEvent.click(movieCardIconFavorited);

    const movieCardFilledIcon = await waitFor(() => screen.getByAltText('not favorited'));

    expect(movieCardFilledIcon).toBeInTheDocument();
  });

  it('should be able to favorite a movie and view it on the Favorites page', async () => {

    getMovies.mockResolvedValue({
      movies: [
        {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http://coolcats.com',
          poster_path: 'http://coolcats-on-beach.com'
        }
      ]
    })

    checkLoginCredentials.mockResolvedValue({
      user: {
        email: 'diana@turing.io',
        id: 100,
        name: 'Di'
      }
    })

    fetchUserRatings.mockResolvedValue({
      ratings: []
    })

    getFavoriteMovies.mockResolvedValueOnce([])

    postFavoriteMovie.mockResolvedValueOnce(
      {
        message: 'Movie with an id of 1 was favorited'
      }
    )

    getFavoriteMovies.mockResolvedValueOnce([1])

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');

    const submitBtn = screen.getByText('Submit');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
    fireEvent.change(passwordInput, { target: { value: '111111' }});
    fireEvent.click(submitBtn);

    const movieCardIcon = await waitFor(() => screen.getByAltText('not favorited'));

    fireEvent.click(movieCardIcon);

    const FavoritesNavItem = screen.getByText('Favorites');

    fireEvent.click(FavoritesNavItem);

    const favoriteMovie = await waitFor(() => screen.getByText('Cats'));

    expect(favoriteMovie).toBeInTheDocument(); 
  })
})