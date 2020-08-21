import React from 'react';
import App from '../App/App.js'
import Header from './Header.js';
import { screen, fireEvent, render, getByLabelText }
  from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('should have the correct content when rendered', () => {
    render(<Header
      changeView={jest.fn()} 
      loggedIn={false}
      updateLoginStatus={jest.fn()} 
      updateUserId={jest.fn()} 
    />)
    const button = screen.getByRole('button');
    const heading = screen.getByRole('heading');
    expect(button).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  })

  it('should fire functions when the log out button is clicked', () => {
    const mockChangeView = jest.fn()
    const mockUpdateLoginStatus = jest.fn()
    const mockUpdateUserId = jest.fn()
    render(<Header
      changeView={mockChangeView}
      loggedIn= {true}
      updateLoginStatus={mockUpdateLoginStatus}
      updateUserId={mockUpdateUserId}
    />)
    const button = screen.getByRole('button');
    fireEvent.click(button); 

    expect(mockChangeView).toBeCalledTimes(1);
    expect(mockChangeView).toBeCalledWith('homepage');

    expect(mockUpdateLoginStatus).toBeCalledTimes(1);
    expect(mockUpdateLoginStatus).toBeCalledWith(false);

    expect(mockUpdateUserId ).toBeCalledTimes(1);
    expect(mockUpdateUserId ).toBeCalledWith(null);
  });

  it('should fire functions when the log in button is clicked', () => {
    const mockChangeView = jest.fn()
    const mockUpdateLoginStatus = jest.fn()
    const mockUpdateUserId = jest.fn()
    render(<Header
      changeView={mockChangeView}
      loggedIn= {false}
      updateLoginStatus={mockUpdateLoginStatus}
      updateUserId={mockUpdateUserId}
    />)
    const button = screen.getByRole('button');
    fireEvent.click(button); 

    expect(mockChangeView).toBeCalledTimes(1);
    expect(mockChangeView).toBeCalledWith('login');
  });

})