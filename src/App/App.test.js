import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { getMovies, checkLoginCredentials, fetchUserRatings, getFavoriteMovies } from '../apiCalls';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
jest.mock('../apiCalls')

describe('App Component', () => {
  it('should load a list of movie cards when the app loads', async () => {
    
    getMovies.mockResolvedValue({
      movies: [
          {
          id: 1,
          title: 'Cats',
          release_date: '2020-01-20',
          average_rating: 10,
          backdrop_path: 'http//coolcats.com',
          poster_path: 'http//coolcats-on-beach.com'
        },
        {
          id: 2,
          title: 'Dogs',
          release_date: '2020-02-20',
          average_rating: 10,
          backdrop_path: 'http//coolDogs.com',
          poster_path: 'http//coolDog-on-beach.com'
        }
      ]
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const title1 = await waitFor (() => screen.getByText('Cats'))
    const title2 = await waitFor(() => screen.getByText('Dogs'))

    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
  })

  it('should display an error message if movie cards fail to load', async () => 
  {
    getMovies.mockRejectedValue('Error loading movies')
    
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('Oops! Something went wrong!'))
    expect(errorMsg).toBeInTheDocument()
  })

it('should be able to successfully log in a user', async () => {

  checkLoginCredentials.mockResolvedValue({
    user: {
      email: "diana@turing.io",
      id: 100,
      name: "Di"
    }
  });

  fetchUserRatings.mockResolvedValue({
    ratings: [
      {
        id: 1,
        user_id: 100,
        movie_id: 10,
        rating: 5,
        created_at: "2020-08-17T23:48:55.695Z",
        updated_at: "2020-08-17T23:48:55.695Z"
      },
      {
        id: 2,
        user_id: 100,
        movie_id: 20,
        rating: 10,
        created_at: "2020-09-12T23:48:55.695Z",
        updated_at: "2020-09-12T23:48:55.695Z"
      }
    ]
  });

  getFavoriteMovies.mockRejectedValue([1, 2])

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  const loginBtn = screen.getByText('Log in')
  fireEvent.click(loginBtn)

  const emailInput = screen.getByPlaceholderText('Email address');
  const passwordInput = screen.getByPlaceholderText('Password');

  const submitBtn = screen.getByText('Submit');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument(); 

  fireEvent.change(emailInput, {target: { value: 'diana@turing.io' }})
  fireEvent.change(passwordInput, { target: { value: '111111' }})

  fireEvent.click(submitBtn) 

  // Can't get back to home view:
  // when log in is successful user should be redirected home

  const logoutBtn = await waitFor(() => screen.getByText('Log out'))
  expect(logoutBtn).toBeInTheDocument()
  });
})