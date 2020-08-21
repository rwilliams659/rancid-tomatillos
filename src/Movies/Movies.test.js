import React from 'react';
import App from '../App/App.js'
import Movies from './Movies.js';
import { screen,fireEvent, render, getByLabelText }
  from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Movies Component', () => {
  it('should have the correct content when rendered', () => {
    // const movie1 = {
    //   id: 1,
    //   title: 'Cats',
    //   release_date:'2020-01-20',
    //   average_rating: 10,
    //   backdrop_path:'http//coolcats.com',
    //   poster_path:'http//coolcats-on-beach.com'
    // }
    // const movie2 = {
    //   id: 2,
    //   title: 'Dogs',
    //   release_date: '2020-02-20',
    //   average_rating: 10,
    //   backdrop_path: 'http//coolDogs.com',
    //   poster_path: 'http//coolDog-on-beach.com'
    // }

    render(<App />)
    const moviesSection = screen.getByLabelText('all-movies')
    expect(moviesSection).toBeInTheDocument()
  })
})