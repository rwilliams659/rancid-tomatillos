import React from 'react'
import MovieDetails from './MovieDetails';
import { screen, render, waitFor, fireEvent }
  from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import { postNewRating, deleteRating, fetchUserRatings } from '../apiCalls'; 
jest.mock('../apiCalls'); 

describe('MovieDetails component', () => {
  it('if the user is not logged in, should have the correct content when rendered', () => {
    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    const rating1 = {
      id: 15,
      user_id: 1,
      movie_id: 17,
      rating: 10,
      created_at: "2020-08-17T23:48:55.695Z",
      updated_at: "2020-08-17T23:48:55.695Z"
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[]}
          currentMovie={movie1}
          currentMovieRatingInfo={rating1}
          loggedIn={false}
          userId={null}
          updateUserRatings={jest.fn()}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )

    const poster = screen.getByAltText('Cats');
    const title = screen.getByText('Cats');
    const releaseDate = screen.getByText('Release date: 2020-01-20');
    const averageRating = screen.getByText('Average rating: 10');

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
  });

  it('if the user is logged in & has rated the movie, should have the correct content when rendered', () => {
    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    const rating1 = {
      id: 15,
      user_id: 1,
      movie_id: 17,
      rating: 10,
      created_at: "2020-08-17T23:48:55.695Z",
      updated_at: "2020-08-17T23:48:55.695Z"
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[rating1]}
          currentMovie={movie1}
          currentMovieRatingInfo={rating1}
          loggedIn={true}
          userId={1}
          updateUserRatings={jest.fn()}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )

    const poster = screen.getByAltText('Cats');
    const title = screen.getByText('Cats');
    const releaseDate = screen.getByText('Release date: 2020-01-20');
    const averageRating = screen.getByText('Average rating: 10');
    const userRating = screen.getByText('Your rating: 10');
    const deleteBtn = screen.getByRole('button');
    const heartIcon = screen.getByAltText('not favorited')

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument(); 
  });

  it('if the user is logged in but doesn\'t have a rating, should have the correct content when rendered', () => {
    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[]}
          currentMovie={movie1}
          currentMovieRatingInfo={null}
          loggedIn={true}
          userId={1}
          updateUserRatings={jest.fn()}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )

    const poster = screen.getByAltText('Cats');
    const title = screen.getByText('Cats');
    const releaseDate = screen.getByText('Release date: 2020-01-20');
    const averageRating = screen.getByText('Average rating: 10');
    const form = screen.getByLabelText('select movie rating');
    const heartIcon = screen.getByAltText('not favorited')

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument(); 
  });

  it('if the user is logged in and has favorited the movie, should have the correct content when rendered', () => {
    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[]}
          currentMovie={movie1}
          currentMovieRatingInfo={null}
          loggedIn={true}
          userId={1}
          updateUserRatings={jest.fn()}
          favorites={[17]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )

    const poster = screen.getByAltText('Cats');
    const title = screen.getByText('Cats');
    const releaseDate = screen.getByText('Release date: 2020-01-20');
    const averageRating = screen.getByText('Average rating: 10');
    const form = screen.getByLabelText('select movie rating');
    const heartIcon = screen.getByAltText('favorited')

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument();
  });

  //DOESN'T WORK YET!!! 
  it.skip('should add and display new rating when a rating is submitted', async () => {

    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    //need to mock addRating
    // MovieDetails.addRating=jest.fn(); 

    postNewRating.mockResolvedValue({
      rating: {
        movie_id: 17,
        rating: 10,
        user_id: 1
      }
    })

    fetchUserRatings.mockResolvedValue({
      ratings: [{
        movie_id: 17,
        rating: 10,
        user_id: 1,
        created_at: "2020-08-17T23:48:55.695Z",
        updated_at: "2020-08-17T23:48:55.695Z"
      }]
    })

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[]}
          currentMovie={movie1}
          currentMovieRatingInfo={null}
          loggedIn={true}
          userId={1}
          updateUserRatings={jest.fn()}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )

    const input = screen.getByText('10');
    const submitBtn = screen.getByText('Submit')
    fireEvent.change(input, {target: {value: '10'}})
    fireEvent.click(submitBtn)

    const userRating = await waitFor(() => screen.getByText('Your rating: 10'));
    const deleteBtn = await waitFor(() => screen.getByText('Delete rating'));

    expect(userRating).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();

    //mock out both addRating & postNewRating
    //check that each was called once
  })

  it.skip('should delete rating and display add rating form', async () => {

    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http//coolcats.com',
      poster_path: 'http//coolcats-on-beach.com'
    }

    const rating1 = {
      id: 15,
      user_id: 1,
      movie_id: 17,
      rating: 10,
      created_at: "2020-08-17T23:48:55.695Z",
      updated_at: "2020-08-17T23:48:55.695Z"
    }

    deleteRating.mockResolvedValue('Success')

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http//coolcats-on-beach.com'
          title='Cats'
          release_date='2020-01-20'
          average_rating={10}
          userRatings={[rating1]}
          currentMovie={movie1}
          currentMovieRatingInfo={rating1}
          loggedIn={true}
          userId={1}
          updateUserRatings={jest.fn()}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </BrowserRouter>
    )
    
    const deleteBtn = screen.getByText('Delete rating');
    fireEvent.click(deleteBtn)

    const form = await waitFor (() => screen.getByLabelText('select movie rating'));
   
    expect(deleteBtn).not.toBeInTheDocument();
    expect(form).toBeInTheDocument();
  

    //mock out both addRating & postNewRating
    //check that each was called once
  })



})