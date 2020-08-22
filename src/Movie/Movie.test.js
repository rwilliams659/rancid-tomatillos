import React from 'react';
import Movie from './Movie.js';
import { screen, render }
  from '@testing-library/react';
import '@testing-library/jest-dom';

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
    const movieImage = screen.getByLabelText('movie')

    expect(title).toBeInTheDocument();
    expect(aveRating).toBeInTheDocument();
    expect(movieImage).toBeInTheDocument();
  });
})