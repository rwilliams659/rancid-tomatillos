import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { getMovies } from '../apiCalls';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const errorMsg = await waitFor(() => screen.getByText('Oops! Something went wrong!'))
    expect(errorMsg).toBeInTheDocument()
  })


})



// it should be able to log in a user(test that they can click on the login button, fill out the login form and get redirected back home with some indication that they're logged in)

// log in button clicked
// login component rendered
// fill out form
// submit log in clicked
// redirected home
