import React from 'react';
import Movie from './Movie.js';
import { screen, render }
  from '@testing-library/react';
import '@testing-library/jest-dom';

//CHANGE BELOW TEST TO TEST H2 THAT WILL BE ADDED ON LINE 19 INSTEAD 
describe('Movie Component', () => {
  it('should have the correct content when rendered', () => {
    render(<Movie
        id={1}
        title='Cats'
        releaseDate='2020-01-20'
        averageRating={10}
        backdropPath='http//coolcats.com'
        posterPath='http//coolcats-on-beach.com'
      />
    )
    const title = screen.getByText('Cats')
    const aveRating = screen.getByText('10 / 10')

    expect(title).toBeInTheDocument();
    expect(aveRating).toBeInTheDocument();

    // Need to add tests for background image



  })
})