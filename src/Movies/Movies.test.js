import React from 'react';
import App from '../App/App.js'
import Movies from './Movies.js';
import { screen,fireEvent, render, getByLabelText }
  from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Movies Component', () => {
  it('should have the correct content when rendered', () => {
    const movie1 = {
      id: 1,
      title: 'Cats',
      release_date:'2020-01-20',
      average_rating: 10,
      backdrop_path:'http//coolcats.com',
      poster_path:'http//coolcats-on-beach.com'
    }
    const movie2 = {
      id: 2,
      title: 'Dogs',
      release_date: '2020-02-20',
      average_rating: 10,
      backdrop_path: 'http//coolDogs.com',
      poster_path: 'http//coolDog-on-beach.com'
    }

    render(<Movies 
      movies={[movie1, movie2]}
      updateCurrentMovie={jest.fn()}
    />)
    const moviesSection = screen.getByLabelText('all-movies')
    expect(moviesSection).toBeInTheDocument()
  })

  it('should render an h2 with the text Browse All Movies', () => {
    const movie1 = {
      id: 1,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }
    const movie2 = {
      id: 2,
      title: 'Dogs',
      release_date: '2020-02-20',
      average_rating: 10,
      backdrop_path: 'http//coolDogs.com',
      poster_path: 'http//coolDog-on-beach.com'
    }

    render(<Movies
      movies={[movie1, movie2]}
      updateCurrentMovie={jest.fn()}
    />)
    const allMoviesTitle = screen.getByRole('heading', {name: 'Browse All Movies'})
    expect(allMoviesTitle).toBeInTheDocument()
  })

  it('should render the number of cards equal to the length of the array that it\'s being passed', () => {
    const movie1 = {
      id: 1,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }
    const movie2 = {
      id: 2,
      title: 'Dogs',
      release_date: '2020-02-20',
      average_rating: 10,
      backdrop_path: 'http//coolDogs.com',
      poster_path: 'http//coolDog-on-beach.com'
    }

    render(<Movies
      movies={[movie1, movie2]}
      updateCurrentMovie={jest.fn()}
    />)

    const movieTitle1 = screen.getByRole('heading', {name: 'Cats'});
    const movieTitle2 = screen.getByRole('heading', {name: 'Dogs'});

    expect(movieTitle1).toBeInTheDocument();
    expect(movieTitle2).toBeInTheDocument(); 
  })
})