import React from 'react';
import Login from './Login.js';
import { screen, fireEvent, render, waitFor }
  from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { checkLoginCredentials } from '../apiCalls';
jest.mock('../apiCalls')

describe('Login component', () => {
  it('should have the correct content when rendered', () => {
    render(
      <BrowserRouter>
        <Login 
          updateUserId={jest.fn()}
          updateLoginStatus={jest.fn()}
          loggedIn={false}
          getUserRatings={jest.fn()}
          setFavoriteMovies={jest.fn()}
        />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument(); 
  });

  // NOT WORKING YET; GETTING ERROR INSTEAD OF CALLING FUNCTIONS
  // it('on successfully validated login, should call the correct functions', async () => {
    
  //   const mockUpdatedUserId = jest.fn(); 
  //   const mockUpdateLoginStatus = jest.fn(); 
  //   const mockGetUserRatings = jest.fn(); 
  //   const mockSetFavoriteMovies = jest.fn(); 

  //   checkLoginCredentials.mockResolvedValue({
  //     user: {
  //       email: "diana@turing.io",
  //       id: 100,
  //       name: "Di"
  //     }
  //   })
    
  //   render(
  //     <BrowserRouter>
  //       <Login
  //         updateUserId={mockUpdatedUserId}
  //         updateLoginStatus={mockUpdateLoginStatus}
  //         loggedIn={false}
  //         getUserRatings={mockGetUserRatings}
  //         setFavoriteMovies={mockSetFavoriteMovies}
  //       />
  //     </BrowserRouter>
  //   )

  //   const emailInput = screen.getByPlaceholderText('Email address');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const submitBtn = screen.getByText('Submit');

  //   fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }});
  //   fireEvent.change(passwordInput, { target: { value: '111111' }});
  //   fireEvent.click(submitBtn);

  //   expect(mockUpdatedUserId).toHaveBeenCalledTimes(1);
  //   expect(mockUpdateLoginStatus).toHaveBeenCalledTimes(1);
  //   expect(mockGetUserRatings).toHaveBeenCalledTimes(1);
  //   expect(mockSetFavoriteMovies).toHaveBeenCalledTimes(1);
  // });

  it('should display an error when login credentials are invalid', async () => {

    checkLoginCredentials.mockRejectedValue('Login error')

    render(
      <BrowserRouter>
        <Login
        updateUserId={jest.fn()}
        updateLoginStatus={jest.fn()}
        loggedIn={false}
        getUserRatings={jest.fn()}
        setFavoriteMovies={jest.fn()}
      />
      </BrowserRouter>
    )

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(emailInput, { target: { value: 'd@turing.io' } })
    fireEvent.change(passwordInput, { target: { value: '188' } })
    fireEvent.click(submitBtn) 

    const errorMsg = await waitFor(() => screen.getByText('Invalid username or password'))

    expect(errorMsg).toBeInTheDocument(); 
  });
});




