import React from 'react'
import MovieDetails from './MovieDetails';
import { screen, render }
  from '@testing-library/react'
import '@testing-library/jest-dom'

describe('MovieDetails component', () => {
  it('should have the correct content when rendered', () => {
    render(<MovieDetails
      poster='http//coolcats-on-beach.com'
      title='Cats'
      releaseDate='2020-01-20'
      averageRating={10}
    />)

    const poster = screen.getByAltText('Cats');
    const title = screen.getByText('Cats');
    const releaseDate = screen.getByText('Release date: 2020-01-20');
    const averageRating = screen.getByText('Average rating: 10');

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
  });
})