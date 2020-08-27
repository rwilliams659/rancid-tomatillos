import React from 'react';
import Movie from './Movie.js';
import { screen, render }
  from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Movie Component', () => {
  it('when a user is not yet logged in, it should have the correct content when rendered', () => {
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
    const movieImage = screen.getByLabelText('movie-overview')

    expect(title).toBeInTheDocument();
    expect(aveRating).toBeInTheDocument();
    expect(movieImage).toBeInTheDocument();
  });

  it('when a user is logged in, it should have the correct content when rendered, including their own rating', () => {
    const rating1 = {
      id: 15,
      user_id: 1,
      movie_id: 1,
      rating: 10,
      created_at: "2020-08-17T23:48:55.695Z",
      updated_at: "2020-08-17T23:48:55.695Z"
    }

    render(<Movie
      id={1}
      title='Cats'
      releaseDate='2020-01-20'
      averageRating={10}
      backdropPath='http//coolcats.com'
      posterPath='http//coolcats-on-beach.com'
      rating={rating1}
    />
    )
    const title = screen.getByText('Cats')
    const aveRating = screen.getByText('10 / 10')
    const movieImage = screen.getByLabelText('movie-overview')
    const userRating = screen.getByText('Your rating: 10 / 10');

    expect(title).toBeInTheDocument();
    expect(aveRating).toBeInTheDocument();
    expect(movieImage).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
  });
})