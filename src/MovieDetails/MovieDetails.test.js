import React from 'react'
import MovieDetails from './MovieDetails';
import { screen, render, waitFor, fireEvent }
  from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { postNewRating, deleteRating, fetchUserRatings, getComments } from '../apiCalls'; 
import userEvent from '@testing-library/user-event'
jest.mock('../apiCalls'); 

describe('MovieDetails component', () => {
  it('if the user is not logged in, should have the correct content when rendered', () => {

    getComments.mockResolvedValueOnce({
      comments: []
    })
    
    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http://coolcats.com',
      poster_path: 'http://coolcats-on-beach.com'
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
          poster_path='http://coolcats-on-beach.com'
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
    const commentArea = screen.getByLabelText('Movie comment area')

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
    expect(commentArea).toBeInTheDocument()
  });

  it('if the user is logged in & has rated the movie, should have the correct content when rendered', () => {

    getComments.mockResolvedValueOnce({
      comments: []
    })

    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http://coolcats.com',
      poster_path: 'http://coolcats-on-beach.com'
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
          poster_path='http://coolcats-on-beach.com'
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
    const deleteBtn = screen.getByText('Delete rating');
    const heartIcon = screen.getByAltText('not favorited')
    const commentArea = screen.getByLabelText('Movie comment area')

    expect(poster).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(averageRating).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(heartIcon).toBeInTheDocument(); 
    expect(commentArea).toBeInTheDocument()
  });

  it('if the user is logged in but doesn\'t have a rating, should have the correct content when rendered', () => {

    getComments.mockResolvedValueOnce({
      comments: []
    })

    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http://coolcats.com',
      poster_path: 'http://coolcats-on-beach.com'
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http://coolcats-on-beach.com'
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

    getComments.mockResolvedValueOnce({
      comments: []
    })

    const movie1 = {
      id: 17,
      title: 'Cats',
      release_date: '2020-01-20',
      average_rating: 10,
      backdrop_path: 'http://coolcats.com',
      poster_path: 'http://coolcats-on-beach.com'
    }

    render(
      <BrowserRouter>
        <MovieDetails
          poster_path='http://coolcats-on-beach.com'
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

  // DOESN'T WORK YET (MOCKED FUNCTION NOT BEING CALLED EVEN THOUGH LOOKS LIKE IT SHOULD)
  // it('should add a new rating when a rating is submitted', async () => {

  //   getComments.mockResolvedValueOnce({
  //     comments: []
  //   })

  //   const movie1 = {
  //     id: 17,
  //     title: 'Cats',
  //     release_date: '2020-01-20',
  //     average_rating: 10,
  //     backdrop_path: 'http://coolcats.com',
  //     poster_path: 'http://coolcats-on-beach.com'
  //   }

  //   postNewRating.mockResolvedValue({
  //     rating: {
  //       movie_id: 17,
  //       rating: 10,
  //       user_id: 1
  //     }
  //   })

  //   // fetchUserRatings.mockResolvedValue({
  //   //   ratings: [{
  //   //     movie_id: 17,
  //   //     rating: 10,
  //   //     user_id: 1,
  //   //     created_at: "2020-08-17T23:48:55.695Z",
  //   //     updated_at: "2020-08-17T23:48:55.695Z"
  //   //   }]
  //   // })

  //   const mockUpdateUserRatings = jest.fn(); 

  //   render(
  //     <MemoryRouter>
  //       <MovieDetails
  //         poster_path='http://coolcats-on-beach.com'
  //         title='Cats'
  //         release_date='2020-01-20'
  //         average_rating={10}
  //         userRatings={[]}
  //         currentMovie={movie1}
  //         currentMovieRatingInfo={null}
  //         loggedIn={true}
  //         userId={1}
  //         updateUserRatings={mockUpdateUserRatings}
  //         favorites={[]}
  //         toggleFavorite={jest.fn()}
  //       />
  //     </MemoryRouter>
  //   )

  //   const form = screen.getByTestId('select-one')
  //   const input10 = screen.getByTestId('val10')
  //   const submitBtn = screen.getByText('Submit')
  //   screen.debug()

  //   userEvent.selectOptions(form, ['10'])

  //   expect(input10.selected).toBe(true)

  //   fireEvent.click(submitBtn)

  //   expect(mockUpdateUserRatings).toBeCalledTimes(1); 
  // });

   // DOESN'T WORK YET (MOCKED FUNCTION NOT BEING CALLED EVEN THOUGH LOOKS LIKE IT SHOULD)
  // it('should delete rating and display add rating form', async () => {

  //   getComments.mockResolvedValueOnce({
  //     comments: []
  //   })

  //   const movie1 = {
  //     id: 17,
  //     title: 'Cats',
  //     release_date: '2020-01-20',
  //     average_rating: 10,
  //     backdrop_path: 'http://coolcats.com',
  //     poster_path: 'http://coolcats-on-beach.com'
  //   }

  //   const rating1 = {
  //     id: 15,
  //     user_id: 1,
  //     movie_id: 17,
  //     rating: 10,
  //     created_at: "2020-08-17T23:48:55.695Z",
  //     updated_at: "2020-08-17T23:48:55.695Z"
  //   }

  //   deleteRating.mockResolvedValue('Success')

  //   const mockUpdateUserRatings = jest.fn(); 

  //   render(
  //     <BrowserRouter>
  //       <MovieDetails
  //         poster_path='http://coolcats-on-beach.com'
  //         title='Cats'
  //         release_date='2020-01-20'
  //         average_rating={10}
  //         userRatings={[rating1]}
  //         currentMovie={movie1}
  //         currentMovieRatingInfo={rating1}
  //         loggedIn={true}
  //         userId={1}
  //         updateUserRatings={mockUpdateUserRatings}
  //         favorites={[]}
  //         toggleFavorite={jest.fn()}
  //       />
  //     </BrowserRouter>
  //   )
    
  //   const deleteBtn = screen.getByText('Delete rating');
    
  //   fireEvent.click(deleteBtn)

  //   expect(mockUpdateUserRatings).toBeCalledTimes(1);
  // });
})