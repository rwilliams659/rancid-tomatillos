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

  // it.skip('on successful log in user should be redirected to home page', async () => {
    
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
  //         updateUserId={jest.fn()}
  //         updateLoginStatus={jest.fn()}
  //         loggedIn={false}
  //         getUserRatings={jest.fn()}
  //       />
  //     </BrowserRouter>
  //   )

  //   const emailInput = screen.getByPlaceholderText('Email address');
  //   const passwordInput = screen.getByPlaceholderText('Password');
  //   const submitBtn = screen.getByText('Submit');

  //   fireEvent.change(emailInput, { target: { value: 'diana@turing.io' }})
  //   fireEvent.change(passwordInput, { target: { value: '111111' }})
  //   fireEvent.click(submitBtn) 

  //   const logoutBtn = await waitFor(() => screen.getByText('Log out'))
  //   expect(logoutBtn).toBeInTheDocument()
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




