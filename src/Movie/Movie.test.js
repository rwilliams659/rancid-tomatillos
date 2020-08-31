import React from 'react';
import Movie from './Movie.js';
import { screen, render }
  from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('Movie Component', () => {
  it('when a user is not yet logged in, it should have the correct content when rendered', () => {
    render(
      <BrowserRouter>
        <Movie
            id={1}
            title='Cats'
            averageRating={10}
            backdropPath='http//coolcats.com'
            favorites={[]}
            loggedIn={false}
            rating={null}
            home={true}
          />
        </BrowserRouter>
    )
    const title = screen.getByText('Cats');
    const aveRating = screen.getByText('10 / 10');
    const movieImage = screen.getByLabelText('movie-overview');

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

    render(
      <BrowserRouter>
        <Movie
          id={1}
          title='Cats'
          averageRating={10}
          backdropPath='http//coolcats.com'
          favorites={[]}
          loggedIn={true}
          rating={rating1}
          home={true}
        />
      </BrowserRouter>
    )
    const title = screen.getByText('Cats')
    const aveRating = screen.getByText('10 / 10')
    const movieImage = screen.getByLabelText('movie-overview')
    const userRating = screen.getByText('Your rating: 10 / 10');
    const heartIcon = screen.getByAltText('not favorited')
  
    expect(title).toBeInTheDocument();
    expect(aveRating).toBeInTheDocument();
    expect(movieImage).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument(); 
  });

  it('when a user is logged in, their favorite movies should be displayed with a filled in heart icon', () => {
    render(
      <BrowserRouter>
        <Movie
          id={1}
          title='Cats'
          averageRating={10}
          backdropPath='http//coolcats.com'
          favorites={[1]}
          loggedIn={true}
          rating={null}
          home={false}
        />
      </BrowserRouter>
    )

    const heartIcon = screen.getByAltText('favorited');

    expect(heartIcon).toBeInTheDocument();
  });
})