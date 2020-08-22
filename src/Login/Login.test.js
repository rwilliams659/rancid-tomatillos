import React from 'react';
import Login from './Login.js';
import { screen, fireEvent, render }
  from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login component', () => {
  it('should have the correct content when rendered', () => {
    render(<Login 
      updateUserId={jest.fn()}
      updateLoginStatus={jest.fn()}
      changeView={jest.fn()}
      error=''
      updateError={jest.fn()}
    />)

    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitBtn = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument(); 
  });

  //test methods are fired when submit btn is clicked: this.handleLogin
  //NOTE: THE METHOD WE WANT TO TEST IS FIRED IS NOT PASSED DOWN IN PROPS 
  //IF WE FIGURE THIS OUT, ALSO TEST RESULTS WHEN CREDENTIALS ARE INVALID (IE ERROR MSG DISPLAYS)
// it('should fire login handler function when the submit button is clicked', () => {
//   render(<Login
//     updateUserId={jest.fn()}
//     updateLoginStatus={jest.fn()}
//     changeView={jest.fn()}
//     error=''
//     updateError={jest.fn()}
//   />)

//   const submitBtn = screen.getByRole('button');
//   fireEvent.click(submitBtn)

//   expect()
// })

  it('should display an error when login credentials are invalid', () => {
    render(<Login
      updateUserId={jest.fn()}
      updateLoginStatus={jest.fn()}
      changeView={jest.fn()}
      error='Invalid username or password'
      updateError={jest.fn()}
    />)

    const errorMsg = screen.getByText('Invalid username or password');

    expect(errorMsg).toBeInTheDocument(); 
  });

})


